"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManagedObject = void 0;
const Handle_1 = require("../Handle");
const StringUtil_1 = require("../StringUtil");
const ObservableSet_1 = require("../ObservableSet");
const Observable_1 = require("../Observable");
const ReadOnlyObservable_1 = require("../ReadOnlyObservable");
const ReadOnlyObservableSet_1 = require("../ReadOnlyObservableSet");
const ObservableArray_1 = require("../ObservableArray");
const ReadOnlyObservableArray_1 = require("../ReadOnlyObservableArray");
class ManagedObject {
    constructor() {
        this._handles = ObservableSet_1.ObservableSet.ofEmpty();
        this.handles = ReadOnlyObservableSet_1.ReadOnlyObservableSet.givenObservableSet(this._handles);
        this._parentObject = Observable_1.Observable.ofEmpty();
        this.parentObject = ReadOnlyObservable_1.ReadOnlyObservable.givenObservable(this._parentObject);
        this._childObjects = ObservableArray_1.ObservableArray.ofEmpty();
        this.childObjects = ReadOnlyObservableArray_1.ReadOnlyObservableArray.givenObservableArray(this._childObjects);
        this._isInitialized = Observable_1.Observable.givenValue(false);
        this.isInitialized = ReadOnlyObservable_1.ReadOnlyObservable.givenObservable(this._isInitialized);
        this.init = () => {
            if (this.isInitialized.value === false) {
                this._thisHandle = Handle_1.Handle.givenCallback(this.uninit);
                this._childObjects.toValues().forEach((child) => {
                    child.init();
                });
                this.initManagedObject();
                ManagedObject._initializedSet.addValue(this);
                this._isInitialized.setValue(true);
            }
            return this._thisHandle;
        };
        this.uninit = () => {
            if (this._thisHandle == null) {
                return;
            }
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
            ManagedObject._initializedSet.removeValue(this);
            this._isInitialized.setValue(false);
        };
        this.addManagedObject = (childObject) => {
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
        };
        this.addHandle = (handle) => {
            if (handle == null) {
                return undefined;
            }
            this._handles.addValue(handle);
            return handle;
        };
        this.removeManagedObject = (child) => {
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
        };
        this.removeHandle = (handle) => {
            if (handle == null) {
                return;
            }
            this._handles.removeValue(handle);
        };
        this.id = StringUtil_1.StringUtil.stringOfRandomCharacters(8);
    }
    initManagedObject() { }
}
exports.ManagedObject = ManagedObject;
ManagedObject._initializedSet = ObservableSet_1.ObservableSet.ofEmpty();
ManagedObject.initializedSet = ReadOnlyObservableSet_1.ReadOnlyObservableSet.givenObservableSet(ManagedObject._initializedSet);
//# sourceMappingURL=index.js.map