"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultiBinding = void 0;
const observable_1 = require("@anderjason/observable");
const Actor_1 = require("../Actor");
class MultiBinding extends Actor_1.Actor {
    constructor() {
        super(...arguments);
        this.didInvalidate = new observable_1.TypedEvent();
    }
    onActivate() {
        this.props.inputs.forEach((input) => {
            const event = observable_1.Observable.isObservable(input) ? input.didChange : input;
            this.cancelOnDeactivate(event.subscribe(() => {
                this.didInvalidate.emit();
            }));
        });
    }
}
exports.MultiBinding = MultiBinding;
//# sourceMappingURL=index.js.map