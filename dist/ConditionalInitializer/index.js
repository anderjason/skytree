"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConditionalInitializer = void 0;
const observable_1 = require("@anderjason/observable");
const ManagedObject_1 = require("../ManagedObject");
class ConditionalInitializer extends ManagedObject_1.ManagedObject {
    constructor(definition) {
        super();
        this._output = observable_1.Observable.ofEmpty();
        this.output = observable_1.ReadOnlyObservable.givenObservable(this._output);
        this._input = definition.input;
        this._shouldInitialize = definition.fn;
        this._instance = definition.instance;
    }
    static givenDefinition(definition) {
        return new ConditionalInitializer(definition);
    }
    initManagedObject() {
        this.addReceipt(this._input.didChange.subscribe((input) => {
            const isActive = this._shouldInitialize(input);
            if (isActive) {
                if (this._output.value == null) {
                    this._output.setValue(this.addManagedObject(this._instance));
                }
            }
            else {
                if (this._output.value != null) {
                    this.removeManagedObject(this._output.value);
                    this._output.setValue(undefined);
                }
            }
        }, true));
    }
}
exports.ConditionalInitializer = ConditionalInitializer;
//# sourceMappingURL=index.js.map