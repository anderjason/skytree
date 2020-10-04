"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DelayActivator = void 0;
const observable_1 = require("@anderjason/observable");
const ConditionalActivator_1 = require("../ConditionalActivator");
const Actor_1 = require("../Actor");
const Timer_1 = require("../Timer");
class DelayActivator extends Actor_1.Actor {
    onActivate() {
        const shouldActivate = observable_1.Observable.givenValue(false);
        if (this.props.activateAfter != null) {
            this.addActor(new Timer_1.Timer({
                duration: this.props.activateAfter,
                isRepeating: false,
                fn: () => {
                    shouldActivate.setValue(true);
                },
            }));
        }
        else {
            shouldActivate.setValue(true);
        }
        if (this.props.deactivateAfter != null) {
            this.addActor(new ConditionalActivator_1.ConditionalActivator({
                input: shouldActivate,
                fn: (v) => v,
                actor: new Timer_1.Timer({
                    duration: this.props.deactivateAfter,
                    isRepeating: false,
                    fn: () => {
                        shouldActivate.setValue(false);
                    },
                }),
            }));
        }
        this.addActor(new ConditionalActivator_1.ConditionalActivator({
            input: shouldActivate,
            fn: (v) => v,
            actor: this.props.actor,
        }));
    }
}
exports.DelayActivator = DelayActivator;
//# sourceMappingURL=index.js.map