"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Timer = void 0;
const ManagedObject_1 = require("../ManagedObject");
const observable_1 = require("@anderjason/observable");
class Timer extends ManagedObject_1.ManagedObject {
    onActivate() {
        if (this.props.isRepeating == true) {
            this._timeout = setInterval(() => {
                try {
                    this.props.fn();
                }
                catch (err) {
                    console.warn(err);
                }
            }, this.props.duration.toMilliseconds());
            this.cancelOnDeactivate(new observable_1.Receipt(() => {
                if (this._timeout != null) {
                    clearInterval(this._timeout);
                    this._timeout = undefined;
                }
            }));
        }
        else {
            this._timeout = setTimeout(() => {
                try {
                    this.props.fn();
                }
                catch (err) {
                    console.warn(err);
                }
            }, this.props.duration.toMilliseconds());
            this.cancelOnDeactivate(new observable_1.Receipt(() => {
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