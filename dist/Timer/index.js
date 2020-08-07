"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Timer = void 0;
const ManagedObject_1 = require("../ManagedObject");
const Handle_1 = require("../Handle");
class Timer extends ManagedObject_1.ManagedObject {
    constructor(definition) {
        super();
        this._fn = definition.fn;
        this._duration = definition.duration;
        this._isRepeating = definition.isRepeating || false;
    }
    static givenDefinition(definition) {
        return new Timer(definition);
    }
    initManagedObject() {
        if (this._isRepeating) {
            this._timeout = setInterval(() => {
                try {
                    this._fn();
                }
                catch (err) {
                    console.warn(err);
                }
            }, this._duration.toMilliseconds());
            this.addHandle(Handle_1.Handle.givenCallback(() => {
                if (this._timeout != null) {
                    clearInterval(this._timeout);
                    this._timeout = undefined;
                }
            }));
        }
        else {
            this._timeout = setTimeout(() => {
                try {
                    this._fn();
                }
                catch (err) {
                    console.warn(err);
                }
            }, this._duration.toMilliseconds());
            this.addHandle(Handle_1.Handle.givenCallback(() => {
                if (this._timeout != null) {
                    clearTimeout(this._timeout);
                    this._timeout = undefined;
                }
            }));
        }
    }
}
exports.Timer = Timer;
//# sourceMappingURL=index.js.map