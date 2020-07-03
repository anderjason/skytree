"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Handle = void 0;
class Handle {
    constructor(release) {
        this.release = () => {
            if (this._releaseFn == null) {
                return;
            }
            this._releaseFn();
            this._releaseFn = undefined;
            Handle._unreleasedCount -= 1;
            return;
        };
        this._releaseFn = release;
    }
    static getUnreleasedCount() {
        return this._unreleasedCount;
    }
    static givenReleaseFunction(release) {
        this._unreleasedCount += 1;
        return new Handle(release);
    }
    get isReleased() {
        return this._releaseFn == null;
    }
}
exports.Handle = Handle;
Handle._unreleasedCount = 0;
//# sourceMappingURL=index.js.map