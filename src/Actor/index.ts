import { Receipt } from "@anderjason/observable";

export class Actor<T = any> {
  private _receipts: Set<Receipt> = new Set();
  private _parentObject: Actor;
  private _thisReceipt: Receipt | undefined;
  private _childObjects: Actor[] = [];
  private _isActive = false;
  
  private _props: T;

  get isActive(): boolean {
    return this._isActive;
  }
  
  get parentObject(): Actor {
    return this._parentObject;
  }

  get childObjects(): Iterable<Actor> {
    return this._childObjects;
  }

  constructor(props: T) {
    this._props = props;
  }

  get props(): T {
    return this._props;
  }

  activate(): Receipt {
    if (this.isActive === false) {
      this._thisReceipt = new Receipt(() => {
        this.deactivate();
      });

      this._isActive = true;

      this._childObjects.forEach((child) => {
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

    this._isActive = false;

    this._receipts.forEach((receipt) => {
      receipt.cancel();
    });
    this._receipts.clear();

    this._childObjects.forEach((child) => {
      child.deactivate();
    });

    this._childObjects = [];

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

    if (childObject.parentObject != null) {
      childObject.parentObject.removeActor(childObject);
    }

    this._childObjects.push(childObject);
    childObject._parentObject = this;

    if (this.isActive === true) {
      childObject.activate();
    }

    return childObject;
  }

  cancelOnDeactivate(receipt: Receipt): Receipt {
    if (receipt == null) {
      return undefined;
    }

    this._receipts.add(receipt);

    return receipt;
  }

  removeCancelOnDeactivate(receipt: Receipt): void {
    if (receipt == null) {
      return;
    }

    this._receipts.delete(receipt);
  }

  removeActor(child: Actor): void {
    if (child == null) {
      return;
    }

    if (this._childObjects.indexOf(child) === -1) {
      return;
    }

    try {
      child.deactivate();
    } catch (err) {
      console.error(err);
    }

    this._childObjects = this._childObjects.filter(co => co !== child);
    child._parentObject = undefined;
  }

  protected onActivate(): void {}
}
