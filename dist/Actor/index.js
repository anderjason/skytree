"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Actor = void 0;
const observable_1 = require("@anderjason/observable");
const PropsObject_1 = require("../PropsObject");
class Actor extends PropsObject_1.PropsObject {
    constructor(props) {
        super(props);
        this._receipts = new Set();
        this._childObjects = [];
        this._isActive = false;
    }
    get isActive() {
        return this._isActive;
    }
    get parentObject() {
        return this._parentObject;
    }
    get childObjects() {
        return this._childObjects;
    }
    activate() {
        if (this.isActive === false) {
            this._thisReceipt = new observable_1.Receipt(() => {
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
    deactivate() {
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
    addActor(childObject) {
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
    cancelOnDeactivate(receipt) {
        if (receipt == null) {
            return undefined;
        }
        this._receipts.add(receipt);
        return receipt;
    }
    removeCancelOnDeactivate(receipt) {
        if (receipt == null) {
            return;
        }
        this._receipts.delete(receipt);
    }
    removeActor(child) {
        if (child == null) {
            return;
        }
        if (this._childObjects.indexOf(child) === -1) {
            return;
        }
        try {
            child.deactivate();
        }
        catch (err) {
            console.error(err);
        }
        this._childObjects = this._childObjects.filter(co => co !== child);
        child._parentObject = undefined;
    }
    onActivate() { }
}
exports.Actor = Actor;
//# sourceMappingURL=index.js.map