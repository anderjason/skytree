"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManagedObject = void 0;
const Handle_1 = require("../Handle");
const stringOfRandomCharacters_1 = require("../StringUtil/stringOfRandomCharacters");
class ManagedObject {
    constructor() {
        this._handles = [];
        this._children = new Set();
        this.init = () => {
            if (!this.isInitialized) {
                this._thisHandle = Handle_1.Handle.givenReleaseFunction(this.uninit);
                this._children.forEach((child) => {
                    child.init();
                });
                this.initManagedObject();
            }
            return this._thisHandle;
        };
        this.uninit = () => {
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
        this.addChild = (child) => {
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
        this.addHandle = (handle) => {
            this._handles.push(handle);
            return handle;
        };
        this.removeChild = (child) => {
            if (!this._children.has(child)) {
                throw new Error("Object was not found as a child of this object");
            }
            child.uninit();
            this._children.delete(child);
            child._parent = undefined;
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
}
exports.ManagedObject = ManagedObject;
//# sourceMappingURL=index.js.map