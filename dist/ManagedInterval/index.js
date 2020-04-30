"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
class ManagedInterval extends __1.ManagedObject {
    constructor(callback, duration) {
        super();
        this._callback = callback;
        this._duration = duration;
    }
    static ofFunction(callback, duration) {
        return new ManagedInterval(callback, duration);
    }
    initManagedObject() {
        this._interval = setInterval(() => {
            try {
                this._callback();
            }
            catch (err) {
                console.warn(err);
            }
        }, this._duration.toMilliseconds());
        this.addHandle(__1.Handle.ofFunction(() => {
            if (this._interval != null) {
                clearInterval(this._interval);
                this._interval = undefined;
            }
        }));
    }
}
exports.ManagedInterval = ManagedInterval;
//# sourceMappingURL=index.js.map