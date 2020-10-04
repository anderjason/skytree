"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConditionalActivator = void 0;
const observable_1 = require("@anderjason/observable");
const Actor_1 = require("../Actor");
class ConditionalActivator extends Actor_1.Actor {
    constructor() {
        super(...arguments);
        this._output = observable_1.Observable.ofEmpty();
        this.output = observable_1.ReadOnlyObservable.givenObservable(this._output);
    }
    onActivate() {
        this.cancelOnDeactivate(this.props.input.didChange.subscribe((input) => {
            const isActive = this.props.fn(input);
            if (isActive) {
                if (this._output.value == null) {
                    this._output.setValue(this.addActor(this.props.actor));
                }
            }
            else {
                if (this._output.value != null) {
                    this.removeActor(this._output.value);
                    this._output.setValue(undefined);
                }
            }
        }, true));
    }
}
exports.ConditionalActivator = ConditionalActivator;
//# sourceMappingURL=index.js.map