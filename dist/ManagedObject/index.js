"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManagedObject = void 0;
const util_1 = require("@anderjason/util");
const observable_1 = require("@anderjason/observable");
class ManagedObject {
    constructor() {
        this._receipts = observable_1.ObservableSet.ofEmpty();
        this.receipts = observable_1.ReadOnlyObservableSet.givenObservableSet(this._receipts);
        this._parentObject = observable_1.Observable.ofEmpty();
        this.parentObject = observable_1.ReadOnlyObservable.givenObservable(this._parentObject);
        this._childObjects = observable_1.ObservableArray.ofEmpty();
        this.childObjects = observable_1.ReadOnlyObservableArray.givenObservableArray(this._childObjects);
        this._isInitialized = observable_1.Observable.givenValue(false);
        this.isInitialized = observable_1.ReadOnlyObservable.givenObservable(this._isInitialized);
        this.id = util_1.StringUtil.stringOfRandomCharacters(8);
    }
    init() {
        if (this.isInitialized.value === false) {
            this._thisReceipt = observable_1.Receipt.givenCancelFunction(() => {
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
    uninit() {
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
    addManagedObject(childObject) {
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
    addReceipt(receipt) {
        if (receipt == null) {
            return undefined;
        }
        this._receipts.addValue(receipt);
        return receipt;
    }
    removeManagedObject(child) {
        if (child == null) {
            return;
        }
        if (this._childObjects.toIndexOfValue(child) === -1) {
            return;
        }
        try {
            child.uninit();
        }
        catch (err) {
            console.error(err);
        }
        this._childObjects.removeValue(child);
        child._parentObject.setValue(undefined);
    }
    removeReceipt(receipt) {
        if (receipt == null) {
            return;
        }
        this._receipts.removeValue(receipt);
    }
    initManagedObject() { }
}
exports.ManagedObject = ManagedObject;
ManagedObject._initializedSet = observable_1.ObservableSet.ofEmpty();
ManagedObject.initializedSet = observable_1.ReadOnlyObservableSet.givenObservableSet(ManagedObject._initializedSet);
//# sourceMappingURL=index.js.map