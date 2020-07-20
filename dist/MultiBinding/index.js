"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultiBinding = void 0;
const ManagedObject_1 = require("../ManagedObject");
const ObservableSet_1 = require("../ObservableSet");
const SimpleEvent_1 = require("../SimpleEvent");
const Handle_1 = require("../Handle");
class MultiBinding extends ManagedObject_1.ManagedObject {
    constructor(inputs) {
        super();
        this.didChange = SimpleEvent_1.SimpleEvent.ofEmpty();
        this._inputHandles = [];
        this.subscribeInputs = () => {
            this.unsubscribeInputs();
            this.inputs.toValues().forEach((input) => {
                this._inputHandles.push(input.didChange.subscribe(this.onChange));
            });
        };
        this.unsubscribeInputs = () => {
            this._inputHandles.forEach((handle) => {
                handle.release();
            });
            this._inputHandles = [];
        };
        this.onChange = () => {
            if (this._willNotifyChange) {
                return;
            }
            this._willNotifyChange = true;
            setTimeout(() => {
                this._willNotifyChange = false;
                this.didChange.emit();
            }, 1);
        };
        this.inputs = inputs;
    }
    static givenInputs(inputs) {
        return new MultiBinding(ObservableSet_1.ObservableSet.givenValues(inputs));
    }
    static givenObservableInputSet(inputSet) {
        return new MultiBinding(inputSet);
    }
    initManagedObject() {
        this.addHandle(this.inputs.didChange.subscribe(this.subscribeInputs, true));
        this.addHandle(Handle_1.Handle.givenReleaseFunction(this.unsubscribeInputs));
    }
}
exports.MultiBinding = MultiBinding;
//# sourceMappingURL=index.js.map