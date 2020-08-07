"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExclusiveInitializer = void 0;
const ManagedObject_1 = require("../ManagedObject");
const Handle_1 = require("../Handle");
class ExclusiveInitializer extends ManagedObject_1.ManagedObject {
    constructor(definition) {
        super();
        this._input = definition.input;
        this._callback = definition.callback;
    }
    static givenDefinition(definition) {
        return new ExclusiveInitializer(definition);
    }
    initManagedObject() {
        if (this._input != null && this._callback != null) {
            this.addHandle(this._input.subscribe((newValue, oldValue) => {
                const newObject = this._callback(newValue, oldValue, this._object);
                if (newObject === this._object) {
                    return;
                }
                if (this._object != null) {
                    this.removeManagedObject(this._object);
                    this._object = undefined;
                }
                if (newObject != null) {
                    this._object = this.addManagedObject(newObject);
                }
            }, true));
        }
        this.addHandle(Handle_1.Handle.givenCallback(() => {
            this._object = undefined;
        }));
    }
}
exports.ExclusiveInitializer = ExclusiveInitializer;
//# sourceMappingURL=index.js.map