"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Handle = void 0;
const Observable_1 = require("../Observable");
class Handle {
    constructor(release) {
        this.release = () => {
            if (this._releaseFn == null) {
                return;
            }
            const fn = this._releaseFn;
            this._releaseFn = undefined;
            fn();
            Handle.unreleasedCount.setValue(Handle.unreleasedCount.value - 1);
            return;
        };
        this._releaseFn = release;
    }
    static givenReleaseFunction(release) {
        this.unreleasedCount.setValue(this.unreleasedCount.value + 1);
        return new Handle(release);
    }
    get isReleased() {
        return this._releaseFn == null;
    }
}
exports.Handle = Handle;
Handle.unreleasedCount = Observable_1.Observable.givenValue(0);
//# sourceMappingURL=index.js.map