import { Handle } from "../Handle";
import { StringUtil } from "../StringUtil";
import { Observable } from "../Observable";
import { ArrayUtil } from "../ArrayUtil";

export class ManagedObject {
  static readonly initializedCount = Observable.givenValue<number>(0);

  readonly id: string;

  private _handles: Handle[] = [];
  private _thisHandle: Handle | undefined;
  private _parent?: ManagedObject;
  private _children: ManagedObject[] = [];

  constructor() {
    this.id = StringUtil.stringOfRandomCharacters(8);
  }

  get isInitialized(): boolean {
    return this._thisHandle != null && !this._thisHandle.isReleased;
  }

  get parent(): ManagedObject | undefined {
    return this._parent;
  }

  get children(): ManagedObject[] {
    return Array.from(this._children);
  }

  init = (): Handle => {
    if (!this.isInitialized) {
      this._thisHandle = Handle.givenCallback(this.uninit);

      this._children.forEach((child) => {
        child.init();
      });

      ManagedObject.initializedCount.setValue(
        ManagedObject.initializedCount.value + 1
      );

      this.initManagedObject();
    }

    return this._thisHandle;
  };

  uninit = (): void => {
    if (this._thisHandle == null) {
      return;
    }

    ManagedObject.initializedCount.setValue(
      ManagedObject.initializedCount.value - 1
    );

    if (this._handles != null) {
      this._handles.reverse().forEach((handle) => {
        handle.release();
      });
      this._handles = [];
    }

    this._children.forEach((child) => {
      child.uninit();
    });
    this._children = [];

    const handle = this._thisHandle;
    this._thisHandle = undefined;

    handle.release();
  };

  addManagedObject = <T extends ManagedObject>(child: T): T => {
    if (child.parent != null) {
      child.parent.removeManagedObject(child);
    }

    this._children.push(child);
    child._parent = this;

    if (this.isInitialized) {
      child.init();
    }

    return child;
  };

  addHandle = (handle: Handle): Handle => {
    this._handles.push(handle);

    return handle;
  };

  removeManagedObject = (child: ManagedObject): void => {
    if (this._children.indexOf(child) === -1) {
      return;
    }

    child.uninit();
    this._children = ArrayUtil.arrayWithoutValue(this._children, child);
    child._parent = undefined;
  };

  removeHandle = (handle: Handle): void => {
    if (this._handles.indexOf(handle) === -1) {
      return;
    }

    this._handles = ArrayUtil.arrayWithoutValue(this._handles, handle);
  };

  protected initManagedObject(): void {}
}
