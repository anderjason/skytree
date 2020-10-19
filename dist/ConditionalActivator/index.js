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
        const isActive = observable_1.Observable.ofEmpty(observable_1.Observable.isStrictEqual);
        this.cancelOnDeactivate(this.props.input.didChange.subscribe((input) => {
            isActive.setValue(this.props.fn(input));
        }, true));
        this.cancelOnDeactivate(isActive.didChange.subscribe((value) => {
            if (this._output.value != null) {
                this.removeActor(this._output.value);
                this._output.setValue(undefined);
            }
            if (value == true) {
                let newActor;
                if (typeof this.props.actor === "function") {
                    newActor = this.props.actor();
                }
                else {
                    newActor = this.props.actor;
                }
                this._output.setValue(this.addActor(newActor));
            }
        }, true));
    }
}
exports.ConditionalActivator = ConditionalActivator;
//# sourceMappingURL=index.js.map