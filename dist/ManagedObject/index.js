"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManagedObject = void 0;
const util_1 = require("@anderjason/util");
const observable_1 = require("@anderjason/observable");
class ManagedObject {
    constructor() {
        this._handles = observable_1.ObservableSet.ofEmpty();
        this.handles = observable_1.ReadOnlyObservableSet.givenObservableSet(this._handles);
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
            this._thisHandle = observable_1.Handle.givenCallback(() => {
                this.uninit();
            });
            ManagedObject._initializedSet.addValue(this);
            this._isInitialized.setValue(true);
            this._childObjects.toValues().forEach((child) => {
                child.init();
            });
            this.initManagedObject();
        }
        return this._thisHandle;
    }
    uninit() {
        if (this._thisHandle == null) {
            return;
        }
        ManagedObject._initializedSet.removeValue(this);
        this._isInitialized.setValue(false);
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
    addHandle(handle) {
        if (handle == null) {
            return undefined;
        }
        this._handles.addValue(handle);
        return handle;
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
    removeHandle(handle) {
        if (handle == null) {
            return;
        }
        this._handles.removeValue(handle);
    }
    initManagedObject() { }
}
exports.ManagedObject = ManagedObject;
ManagedObject._initializedSet = observable_1.ObservableSet.ofEmpty();
ManagedObject.initializedSet = observable_1.ReadOnlyObservableSet.givenObservableSet(ManagedObject._initializedSet);
//# sourceMappingURL=index.js.map