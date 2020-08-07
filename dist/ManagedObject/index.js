"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManagedObject = void 0;
const Handle_1 = require("../Handle");
const stringOfRandomCharacters_1 = require("../StringUtil/stringOfRandomCharacters");
const Observable_1 = require("../Observable");
const __1 = require("..");
class ManagedObject {
    constructor() {
        this._handles = [];
        this._children = [];
        this.init = () => {
            if (!this.isInitialized) {
                this._thisHandle = Handle_1.Handle.givenCallback(this.uninit);
                this._children.forEach((child) => {
                    child.init();
                });
                ManagedObject.initializedCount.setValue(ManagedObject.initializedCount.value + 1);
                this.initManagedObject();
            }
            return this._thisHandle;
        };
        this.uninit = () => {
            if (this._thisHandle == null) {
                return;
            }
            ManagedObject.initializedCount.setValue(ManagedObject.initializedCount.value - 1);
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
        this.addManagedObject = (child) => {
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
        this.addHandle = (handle) => {
            this._handles.push(handle);
            return handle;
        };
        this.removeManagedObject = (child) => {
            if (this._children.indexOf(child) === -1) {
                throw new Error("Object was not found as a child of this object");
            }
            child.uninit();
            this._children = __1.ArrayUtil.arrayWithoutValue(this._children, child);
            child._parent = undefined;
        };
        this.removeHandle = (handle) => {
            if (this._handles.indexOf(handle) === -1) {
                throw new Error("Handle was not found on this object");
            }
            this._handles = __1.ArrayUtil.arrayWithoutValue(this._handles, handle);
        };
        this.id = stringOfRandomCharacters_1.stringOfRandomCharacters(8);
    }
    get isInitialized() {
        return this._thisHandle != null && !this._thisHandle.isReleased;
    }
    get parent() {
        return this._parent;
    }
    get children() {
        return Array.from(this._children);
    }
    initManagedObject() { }
}
exports.ManagedObject = ManagedObject;
ManagedObject.initializedCount = Observable_1.Observable.givenValue(0);
//# sourceMappingURL=index.js.map