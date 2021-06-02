import { StringUtil } from "@anderjason/util";
import {
  Receipt,
  Observable,
  ObservableArray,
  ObservableSet,
  ReadOnlyObservable,
  ReadOnlyObservableArray,
  ReadOnlyObservableSet,
} from "@anderjason/observable";

export class Actor<T = any> {
  static withDescription<T extends Actor>(description: string, actor: T): T {
    actor.actorDescription = description;
    return actor;
  }

  private static _activeSet = ObservableSet.ofEmpty<Actor>();
  static readonly activeSet = ReadOnlyObservableSet.givenObservableSet(
    Actor._activeSet
  );

  private static _rootSet = ObservableSet.ofEmpty<Actor>();
  static readonly rootSet = ReadOnlyObservableSet.givenObservableSet(
    Actor._rootSet
  );

  readonly actorId: string;
  actorDescription?: string;

  private _receipts = ObservableSet.ofEmpty<Receipt>();
  readonly receipts = ReadOnlyObservableSet.givenObservableSet(this._receipts);

  private _parentObject = Observable.ofEmpty<Actor>();
  readonly parentObject = ReadOnlyObservable.givenObservable(
    this._parentObject
  );

  private _thisReceipt: Receipt | undefined;

  private _childObjects = ObservableArray.ofEmpty<Actor>();
  readonly childObjects = ReadOnlyObservableArray.givenObservableArray(
    this._childObjects
  );

  private _isActive = Observable.givenValue(false);
  readonly isActive = ReadOnlyObservable.givenObservable(this._isActive);

  private _props: T;

  constructor(props: T) {
    this._props = props;

    this.actorId = StringUtil.stringOfRandomCharacters(8);
  }

  get props(): T {
    return this._props;
  }

  get managedObjectId(): string {
    return this.actorId; // for backwards compatibility in v9
  }

  activate(): Receipt {
    if (this.isActive.value === false) {
      this._thisReceipt = new Receipt(() => {
        this.deactivate();
      });

      this.cancelOnDeactivate(
        this.parentObject.didChange.subscribe((parent) => {
          if (parent != null) {
            Actor._rootSet.removeValue(this);
          } else {
            Actor._rootSet.addValue(this);
          }
        }, true)
      );

      Actor._activeSet.addValue(this);
      this._isActive.setValue(true);

      this._childObjects.toValues().forEach((child) => {
        child.activate();
      });

      this.onActivate();
    }

    return this._thisReceipt;
  }

  deactivate(): void {
    if (this._thisReceipt == null) {
      return;
    }

    Actor._rootSet.removeValue(this);
    Actor._activeSet.removeValue(this);
    this._isActive.setValue(false);

    this._receipts.toArray().forEach((receipt) => {
      receipt.cancel();
    });
    this._receipts.clear();

    this._childObjects.toValues().forEach((child) => {
      child.deactivate();
    });

    this._childObjects.clear();

    const receipt = this._thisReceipt;
    this._thisReceipt = undefined;

    if (receipt != null) {
      receipt.cancel();
    }
  }

  addActor<T extends Actor>(childObject: T): T {
    if (childObject == null) {
      return undefined;
    }

    if (childObject.parentObject.value != null) {
      childObject.parentObject.value.removeActor(childObject);
    }

    this._childObjects.addValue(childObject);
    childObject._parentObject.setValue(this);

    if (this.isActive.value === true) {
      childObject.activate();
    }

    return childObject;
  }

  cancelOnDeactivate(receipt: Receipt): Receipt {
    if (receipt == null) {
      return undefined;
    }

    this._receipts.addValue(receipt);

    return receipt;
  }

  removeCancelOnDeactivate(receipt: Receipt): void {
    if (receipt == null) {
      return;
    }

    this._receipts.removeValue(receipt);
  }

  removeActor(child: Actor): void {
    if (child == null) {
      return;
    }

    if (this._childObjects.toIndexOfValue(child) === -1) {
      return;
    }

    try {
      child.deactivate();
    } catch (err) {
      console.error(err);
    }

    this._childObjects.removeValue(child);
    child._parentObject.setValue(undefined);
  }

  protected onActivate(): void {}
}