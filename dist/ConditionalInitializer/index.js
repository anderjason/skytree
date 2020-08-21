"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConditionalInitializer = void 0;
const ManagedObject_1 = require("../ManagedObject");
const Observable_1 = require("../Observable");
class ConditionalInitializer extends ManagedObject_1.ManagedObject {
    constructor(definition) {
        super();
        this.output = Observable_1.Observable.ofEmpty();
        this._input = definition.input;
        this._shouldInitialize = definition.fn;
        this._instance = definition.instance;
    }
    static givenDefinition(definition) {
        return new ConditionalInitializer(definition);
    }
    initManagedObject() {
        this.addHandle(this._input.didChange.subscribe((input) => {
            const isActive = this._shouldInitialize(input);
            if (isActive) {
                if (this.output.value == null) {
                    this.output.setValue(this.addManagedObject(this._instance));
                }
            }
            else {
                if (this.output.value != null) {
                    this.removeManagedObject(this.output.value);
                    this.output.setValue(undefined);
                }
            }
        }, true));
    }
}
exports.ConditionalInitializer = ConditionalInitializer;
//# sourceMappingURL=index.js.map