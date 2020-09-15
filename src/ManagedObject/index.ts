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

export class ManagedObject<T = any> {
  private static _activeSet = ObservableSet.ofEmpty<ManagedObject>();
  static readonly activeSet = ReadOnlyObservableSet.givenObservableSet(
    ManagedObject._activeSet
  );

  readonly managedObjectId: string;

  private _receipts = ObservableSet.ofEmpty<Receipt>();
  readonly receipts = ReadOnlyObservableSet.givenObservableSet(this._receipts);

  private _parentObject = Observable.ofEmpty<ManagedObject>();
  readonly parentObject = ReadOnlyObservable.givenObservable(
    this._parentObject
  );

  private _thisReceipt: Receipt | undefined;

  private _childObjects = ObservableArray.ofEmpty<ManagedObject>();
  readonly childObjects = ReadOnlyObservableArray.givenObservableArray(
    this._childObjects
  );

  private _isActive = Observable.givenValue(false);
  readonly isActive = ReadOnlyObservable.givenObservable(this._isActive);

  private _props: T;

  constructor(props: T) {
    this._props = props;

    this.managedObjectId = StringUtil.stringOfRandomCharacters(8);
  }

  get props(): T {
    return this._props;
  }

  activate(): Receipt {
    if (this.isActive.value === false) {
      this._thisReceipt = new Receipt(() => {
        this.deactivate();
      });

      ManagedObject._activeSet.addValue(this);
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

    ManagedObject._activeSet.removeValue(this);
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

  addManagedObject<T extends ManagedObject>(childObject: T): T {
    if (childObject == null) {
      return undefined;
    }

    if (childObject.parentObject.value != null) {
      childObject.parentObject.value.removeManagedObject(childObject);
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

  removeManagedObject(child: ManagedObject): void {
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
