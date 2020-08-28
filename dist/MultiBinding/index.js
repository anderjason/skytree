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
        this._willCheckNextFrame = false;
        this._invalidatedSet = new Set();
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
                this._invalidatedSet.add(input);
                this.onChange();
            }));
        });
        this.invalidateNow();
    }
    unsubscribeInputs() {
        this._inputHandles.forEach((handle) => {
            handle.release();
        });
        this._inputHandles = [];
        this._invalidatedSet.clear();
    }
    onChange() {
        if (this._invalidateMode === "immediate") {
            this.invalidateNow();
            return;
        }
        if (this._invalidatedSet.size === this.inputs.count) {
            this.invalidateNow();
            return;
        }
        if (this._willCheckNextFrame) {
            return;
        }
        this._willCheckNextFrame = true;
        requestAnimationFrame(() => {
            if (this._invalidatedSet.size > 0) {
                this.invalidateNow();
            }
        });
    }
    invalidateNow() {
        this.didInvalidate.emit();
        this._invalidatedSet.clear();
    }
}
exports.MultiBinding = MultiBinding;
//# sourceMappingURL=index.js.map