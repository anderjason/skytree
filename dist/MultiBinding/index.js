"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultiBinding = void 0;
const ManagedObject_1 = require("../ManagedObject");
const ObservableSet_1 = require("../ObservableSet");
const SimpleEvent_1 = require("../SimpleEvent");
const Handle_1 = require("../Handle");
class MultiBinding extends ManagedObject_1.ManagedObject {
    constructor(definition) {
        super();
        this.didInvalidate = SimpleEvent_1.SimpleEvent.ofEmpty();
        this._inputHandles = [];
        this._isInvalidating = false;
        if (ObservableSet_1.ObservableSet.isObservableSet(definition.inputs)) {
            this.inputs = definition.inputs;
        }
        else {
            this.inputs = ObservableSet_1.ObservableSet.givenValues(definition.inputs);
        }
        this._invalidateMode = definition.invalidateMode;
    }
    static givenDefinition(definition) {
        return new MultiBinding(definition);
    }
    initManagedObject() {
        this.addHandle(this.inputs.didChange.subscribe(() => {
            this.subscribeInputs();
        }, true));
        this.addHandle(Handle_1.Handle.givenCallback(() => {
            this.unsubscribeInputs();
        }));
    }
    subscribeInputs() {
        this.unsubscribeInputs();
        this.inputs.toValues().forEach((input) => {
            this._inputHandles.push(input.didChange.subscribe(() => {
                this.onChange();
            }));
        });
    }
    unsubscribeInputs() {
        this._inputHandles.forEach((handle) => {
            handle.release();
        });
        this._inputHandles = [];
    }
    onChange() {
        if (this._invalidateMode === "immediate") {
            this.didInvalidate.emit();
            return;
        }
        if (this._isInvalidating) {
            return;
        }
        this._isInvalidating = true;
        requestAnimationFrame(() => {
            if (this._isInvalidating) {
                this.didInvalidate.emit();
                this._isInvalidating = false;
            }
        });
    }
}
exports.MultiBinding = MultiBinding;
//# sourceMappingURL=index.js.map