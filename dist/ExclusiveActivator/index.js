"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExclusiveActivator = void 0;
const observable_1 = require("@anderjason/observable");
const Actor_1 = require("../Actor");
class ExclusiveActivator extends Actor_1.Actor {
    constructor() {
        super(...arguments);
        this._output = observable_1.Observable.ofEmpty(observable_1.Observable.isStrictEqual);
        this.output = observable_1.ReadOnlyObservable.givenObservable(this._output);
    }
    onActivate() {
        if (this.props.input != null && this.props.fn != null) {
            let event;
            if (observable_1.Observable.isObservable(this.props.input)) {
                event = this.props.input.didChange;
            }
            else {
                event = this.props.input;
            }
            this.cancelOnDeactivate(event.subscribe((newValue, oldValue) => {
                const newObject = this.props.fn(newValue, oldValue, this._output.value);
                if (newObject === this._lastObject) {
                    return;
                }
                if (this._lastObject != null) {
                    this.removeActor(this._lastObject);
                    this._lastObject = undefined;
                }
                if (newObject != null) {
                    this._lastObject = newObject;
                    this.addActor(newObject);
                }
                this._output.setValue(this._lastObject);
            }, true));
        }
        this.cancelOnDeactivate(new observable_1.Receipt(() => {
            this._output.setValue(undefined);
        }));
    }
}
exports.ExclusiveActivator = ExclusiveActivator;
//# sourceMappingURL=index.js.map