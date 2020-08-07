"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Handle = void 0;
const Observable_1 = require("../Observable");
class Handle {
    constructor(callback) {
        this.release = () => {
            if (this._callback == null) {
                return;
            }
            const fn = this._callback;
            this._callback = undefined;
            fn();
            Handle.unreleasedCount.setValue(Handle.unreleasedCount.value - 1);
            return;
        };
        this._callback = callback;
    }
    static givenCallback(callback) {
        this.unreleasedCount.setValue(this.unreleasedCount.value + 1);
        return new Handle(callback);
    }
    get isReleased() {
        return this._callback == null;
    }
}
exports.Handle = Handle;
Handle.unreleasedCount = Observable_1.Observable.givenValue(0);
//# sourceMappingURL=index.js.map