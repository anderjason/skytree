import { Handle } from "../Handle";
import { StringUtil } from "../StringUtil";
import { ObservableSet } from "../ObservableSet";
import { Observable } from "../Observable";
import { ReadOnlyObservable } from "../ReadOnlyObservable";
import { ReadOnlyObservableSet } from "../ReadOnlyObservableSet";
import { ObservableArray } from "../ObservableArray";
import { ReadOnlyObservableArray } from "../ReadOnlyObservableArray";

export class ManagedObject {
  private static _initializedSet = ObservableSet.ofEmpty<ManagedObject>();
  static readonly initializedSet = ReadOnlyObservableSet.givenObservableSet(
    ManagedObject._initializedSet
  );

  readonly id: string;

  private _handles = ObservableSet.ofEmpty<Handle>();
  readonly handles = ReadOnlyObservableSet.givenObservableSet(this._handles);

  private _parentObject = Observable.ofEmpty<ManagedObject>();
  readonly parentObject = ReadOnlyObservable.givenObservable(
    this._parentObject
  );

  private _thisHandle: Handle | undefined;

  private _childObjects = ObservableArray.ofEmpty<ManagedObject>();
  readonly childObjects = ReadOnlyObservableArray.givenObservableArray(
    this._childObjects
  );

  private _isInitialized = Observable.givenValue(false);
  readonly isInitialized = ReadOnlyObservable.givenObservable(
    this._isInitialized
  );

  constructor() {
    this.id = StringUtil.stringOfRandomCharacters(8);
  }

  init = (): Handle => {
    if (this.isInitialized.value === false) {
      this._thisHandle = Handle.givenCallback(this.uninit);

      this._childObjects.toValues().forEach((child) => {
        child.init();
      });

      this.initManagedObject();

      ManagedObject._initializedSet.addValue(this);
      this._isInitialized.setValue(true);
    }

    return this._thisHandle;
  };

  uninit = (): void => {
    if (this._thisHandle == null) {
      return;
    }

    this._handles.toValues().forEach((handle) => {
      handle.release();
    });
    this._handles.clear();

    this._childObjects.toValues().forEach((child) => {
      child.uninit();
    });

    this._childObjects.clear();

    const handle = this._thisHandle;
    this._thisHandle = undefined;

    if (handle != null) {
      handle.release();
    }

    ManagedObject._initializedSet.removeValue(this);
    this._isInitialized.setValue(false);
  };

  addManagedObject = <T extends ManagedObject>(childObject: T): T => {
    if (childObject == null) {
      return undefined;
    }

    if (childObject.parentObject.value != null) {
      childObject.parentObject.value.removeManagedObject(childObject);
    }

    this._childObjects.addValue(childObject);
    childObject._parentObject.setValue(this);

    if (this.isInitialized.value === true) {
      childObject.init();
    }

    return childObject;
  };

  addHandle = (handle: Handle): Handle => {
    if (handle == null) {
      return undefined;
    }

    this._handles.addValue(handle);

    return handle;
  };

  removeManagedObject = (child: ManagedObject): void => {
    if (child == null) {
      return;
    }

    if (this._childObjects.toIndexOfValue(child) === -1) {
      return;
    }

    try {
      child.uninit();
    } catch (err) {
      console.error(err);
    }

    this._childObjects.removeValue(child);
    child._parentObject.setValue(undefined);
  };

  removeHandle = (handle: Handle): void => {
    if (handle == null) {
      return;
    }

    this._handles.removeValue(handle);
  };

  protected initManagedObject(): void {}
}
