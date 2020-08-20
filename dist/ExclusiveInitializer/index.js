"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExclusiveInitializer = void 0;
const ManagedObject_1 = require("../ManagedObject");
const Handle_1 = require("../Handle");
const Observable_1 = require("../Observable");
class ExclusiveInitializer extends ManagedObject_1.ManagedObject {
    constructor(definition) {
        super();
        this.object = Observable_1.Observable.ofEmpty(Observable_1.Observable.isStrictEqual);
        this._input = definition.input;
        this._callback = definition.fn;
    }
    static givenDefinition(definition) {
        return new ExclusiveInitializer(definition);
    }
    initManagedObject() {
        if (this._input != null && this._callback != null) {
            this.addHandle(this._input.didChange.subscribe((newValue, oldValue) => {
                const newObject = this._callback(newValue, oldValue, this.object.value);
                if (newObject === this.object.value) {
                    return;
                }
                if (this.object.value != null) {
                    this.removeManagedObject(this.object.value);
                    this.object.setValue(undefined);
                }
                if (newObject != null) {
                    this.object.setValue(this.addManagedObject(newObject));
                }
            }, true));
        }
        this.addHandle(Handle_1.Handle.givenCallback(() => {
            this.object.setValue(undefined);
        }));
    }
}
exports.ExclusiveInitializer = ExclusiveInitializer;
//# sourceMappingURL=index.js.map