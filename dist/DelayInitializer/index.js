"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DelayInitializer = void 0;
const observable_1 = require("@anderjason/observable");
const ConditionalInitializer_1 = require("../ConditionalInitializer");
const ManagedObject_1 = require("../ManagedObject");
const Timer_1 = require("../Timer");
class DelayInitializer extends ManagedObject_1.ManagedObject {
    onActivate() {
        const isInitialized = observable_1.Observable.givenValue(false);
        this.addManagedObject(new Timer_1.Timer({
            duration: this.props.activateAfter,
            fn: () => {
                isInitialized.setValue(true);
            },
        }));
        if (this.props.deactivateAfter != null) {
            this.addManagedObject(new ConditionalInitializer_1.ConditionalInitializer({
                input: isInitialized,
                fn: (v) => v,
                instance: new Timer_1.Timer({
                    duration: this.props.deactivateAfter,
                    fn: () => {
                        isInitialized.setValue(false);
                    },
                }),
            }));
        }
        this.addManagedObject(new ConditionalInitializer_1.ConditionalInitializer({
            input: isInitialized,
            fn: (v) => v,
            instance: this.props.instance,
        }));
    }
}
exports.DelayInitializer = DelayInitializer;
//# sourceMappingURL=index.js.map