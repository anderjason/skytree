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

export class ManagedObject {
  private static _initializedSet = ObservableSet.ofEmpty<ManagedObject>();
  static readonly initializedSet = ReadOnlyObservableSet.givenObservableSet(
    ManagedObject._initializedSet
  );

  readonly id: string;

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

  private _isInitialized = Observable.givenValue(false);
  readonly isInitialized = ReadOnlyObservable.givenObservable(
    this._isInitialized
  );

  constructor() {
    this.id = StringUtil.stringOfRandomCharacters(8);
  }

  init(): Receipt {
    if (this.isInitialized.value === false) {
      this._thisReceipt = Receipt.givenCancelFunction(() => {
        this.uninit();
      });

      ManagedObject._initializedSet.addValue(this);
      this._isInitialized.setValue(true);

      this._childObjects.toValues().forEach((child) => {
        child.init();
      });

      this.initManagedObject();
    }

    return this._thisReceipt;
  }

  uninit(): void {
    if (this._thisReceipt == null) {
      return;
    }

    ManagedObject._initializedSet.removeValue(this);
    this._isInitialized.setValue(false);

    this._receipts.toArray().forEach((receipt) => {
      receipt.cancel();
    });
    this._receipts.clear();

    this._childObjects.toValues().forEach((child) => {
      child.uninit();
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

    if (this.isInitialized.value === true) {
      childObject.init();
    }

    return childObject;
  }

  addReceipt(receipt: Receipt): Receipt {
    if (receipt == null) {
      return undefined;
    }

    this._receipts.addValue(receipt);

    return receipt;
  }

  removeManagedObject(child: ManagedObject): void {
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
  }

  removeReceipt(receipt: Receipt): void {
    if (receipt == null) {
      return;
    }

    this._receipts.removeValue(receipt);
  }

  protected initManagedObject(): void {}
}
