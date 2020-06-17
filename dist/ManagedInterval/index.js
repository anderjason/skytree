"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManagedInterval = void 0;
const ManagedObject_1 = require("../ManagedObject");
const Handle_1 = require("../Handle");
class ManagedInterval extends ManagedObject_1.ManagedObject {
    constructor(callback, duration) {
        super();
        this._callback = callback;
        this._duration = duration;
    }
    static givenCallback(callback, duration) {
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
        this.addHandle(Handle_1.Handle.givenReleaseFunction(() => {
            if (this._interval != null) {
                clearInterval(this._interval);
                this._interval = undefined;
            }
        }));
    }
}
exports.ManagedInterval = ManagedInterval;
//# sourceMappingURL=index.js.map