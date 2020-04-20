"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Handle {
    constructor(release) {
        this.release = () => {
            if (this._releaseFn == null) {
                return;
            }
            this._releaseFn();
            this._releaseFn = undefined;
            return;
        };
        this._releaseFn = release;
    }
    static ofFunction(release) {
        return new Handle(release);
    }
    get isReleased() {
        return this._releaseFn == null;
    }
}
exports.Handle = Handle;
//# sourceMappingURL=index.js.map