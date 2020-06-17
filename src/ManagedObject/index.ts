import { Handle } from "../Handle";
import { stringOfRandomCharacters } from "../StringUtil/stringOfRandomCharacters";

export abstract class ManagedObject {
  readonly id: string;

  private _handles: Handle[] = [];
  private _thisHandle: Handle | undefined;
  private _parent?: ManagedObject;
  private _children: Set<ManagedObject> = new Set();

  constructor() {
    this.id = stringOfRandomCharacters(8);
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
      this._thisHandle = Handle.givenReleaseFunction(this.uninit);

      this._children.forEach((child) => {
        child.init();
      });

      this.initManagedObject();
    }

    return this._thisHandle;
  };

  uninit = (): void => {
    this._thisHandle = undefined;

    if (this._handles != null && this._handles.length > 0) {
      this._handles.reverse().forEach((handle) => {
        handle.release();
      });
      this._handles = [];
    }

    this._children.forEach((child) => {
      child.uninit();
    });
  };

  addChild = <T extends ManagedObject>(child: T): T => {
    if (this._children.has(child)) {
      return;
    }

    if (child.parent != null) {
      child.parent.removeChild(child);
    }

    this._children.add(child);
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

  removeChild = (child: ManagedObject): void => {
    if (!this._children.has(child)) {
      throw new Error("Object was not found as a child of this object");
    }

    child.uninit();
    this._children.delete(child);
    child._parent = undefined;
  };

  protected abstract initManagedObject(): void;
}
