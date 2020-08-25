"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExclusiveInitializer = void 0;
const ManagedObject_1 = require("../ManagedObject");
const Handle_1 = require("../Handle");
const Observable_1 = require("../Observable");
const __1 = require("..");
class ExclusiveInitializer extends ManagedObject_1.ManagedObject {
    constructor(definition) {
        super();
        this._output = Observable_1.Observable.ofEmpty(Observable_1.Observable.isStrictEqual);
        this.output = __1.ReadOnlyObservable.givenObservable(this._output);
        this._input = definition.input;
        this._callback = definition.fn;
    }
    static givenDefinition(definition) {
        return new ExclusiveInitializer(definition);
    }
    initManagedObject() {
        if (this._input != null && this._callback != null) {
            this.addHandle(this._input.didChange.subscribe((newValue, oldValue) => {
                const newObject = this._callback(newValue, oldValue, this._output.value);
                if (newObject === this._output.value) {
                    return;
                }
                if (this._output.value != null) {
                    this.removeManagedObject(this._output.value);
                    this._output.setValue(undefined);
                }
                if (newObject != null) {
                    this._output.setValue(this.addManagedObject(newObject));
                }
            }, true));
        }
        this.addHandle(Handle_1.Handle.givenCallback(() => {
            this._output.setValue(undefined);
        }));
    }
}
exports.ExclusiveInitializer = ExclusiveInitializer;
//# sourceMappingURL=index.js.map