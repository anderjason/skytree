"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManagedTimeout = void 0;
const ManagedObject_1 = require("../ManagedObject");
const Handle_1 = require("../Handle");
class ManagedTimeout extends ManagedObject_1.ManagedObject {
    constructor(callback, duration) {
        super();
        this._didFire = false;
        this._callback = callback;
        this._duration = duration;
    }
    static givenCallback(callback, duration) {
        return new ManagedTimeout(callback, duration);
    }
    get didFire() {
        return this._didFire;
    }
    initManagedObject() {
        this._timeout = setTimeout(() => {
            try {
                this._didFire = true;
                this._callback();
            }
            catch (err) {
                console.warn(err);
            }
        }, this._duration.toMilliseconds());
        this.addHandle(Handle_1.Handle.givenReleaseFunction(() => {
            if (this._timeout != null) {
                clearTimeout(this._timeout);
                this._timeout = undefined;
            }
        }));
    }
}
exports.ManagedTimeout = ManagedTimeout;
//# sourceMappingURL=index.js.map