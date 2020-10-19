"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Actor = void 0;
const util_1 = require("@anderjason/util");
const observable_1 = require("@anderjason/observable");
class Actor {
    constructor(props) {
        this._receipts = observable_1.ObservableSet.ofEmpty();
        this.receipts = observable_1.ReadOnlyObservableSet.givenObservableSet(this._receipts);
        this._parentObject = observable_1.Observable.ofEmpty();
        this.parentObject = observable_1.ReadOnlyObservable.givenObservable(this._parentObject);
        this._childObjects = observable_1.ObservableArray.ofEmpty();
        this.childObjects = observable_1.ReadOnlyObservableArray.givenObservableArray(this._childObjects);
        this._isActive = observable_1.Observable.givenValue(false);
        this.isActive = observable_1.ReadOnlyObservable.givenObservable(this._isActive);
        this._props = props;
        this.actorId = util_1.StringUtil.stringOfRandomCharacters(8);
    }
    get props() {
        return this._props;
    }
    get managedObjectId() {
        return this.actorId; // for backwards compatibility in v9
    }
    activate() {
        if (this.isActive.value === false) {
            this._thisReceipt = new observable_1.Receipt(() => {
                this.deactivate();
            });
            Actor._activeSet.addValue(this);
            this._isActive.setValue(true);
            this._childObjects.toValues().forEach((child) => {
                child.activate();
            });
            this.onActivate();
        }
        return this._thisReceipt;
    }
    deactivate() {
        if (this._thisReceipt == null) {
            return;
        }
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
    addActor(childObject) {
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
    cancelOnDeactivate(receipt) {
        if (receipt == null) {
            return undefined;
        }
        this._receipts.addValue(receipt);
        return receipt;
    }
    removeCancelOnDeactivate(receipt) {
        if (receipt == null) {
            return;
        }
        this._receipts.removeValue(receipt);
    }
    removeActor(child) {
        if (child == null) {
            return;
        }
        if (this._childObjects.toIndexOfValue(child) === -1) {
            return;
        }
        try {
            child.deactivate();
        }
        catch (err) {
            console.error(err);
        }
        this._childObjects.removeValue(child);
        child._parentObject.setValue(undefined);
    }
    onActivate() { }
}
exports.Actor = Actor;
Actor._activeSet = observable_1.ObservableSet.ofEmpty();
Actor.activeSet = observable_1.ReadOnlyObservableSet.givenObservableSet(Actor._activeSet);
//# sourceMappingURL=index.js.map