"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Handle = void 0;
const ObservableSet_1 = require("../ObservableSet");
class Handle {
    constructor(callback) {
        this._callback = callback;
    }
    static givenCallback(callback) {
        const handle = new Handle(callback);
        this.unreleasedSet.addValue(handle);
        return handle;
    }
    get isReleased() {
        return this._callback == null;
    }
    release() {
        if (this._callback == null) {
            return;
        }
        Handle.unreleasedSet.removeValue(this);
        const fn = this._callback;
        this._callback = undefined;
        fn();
    }
}
exports.Handle = Handle;
Handle.unreleasedSet = ObservableSet_1.ObservableSet.ofEmpty();
//# sourceMappingURL=index.js.map