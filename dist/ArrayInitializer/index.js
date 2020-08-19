"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrayInitializer = void 0;
const ManagedObject_1 = require("../ManagedObject");
const Handle_1 = require("../Handle");
class ArrayInitializer extends ManagedObject_1.ManagedObject {
    constructor(definition) {
        super();
        this._previousInput = [];
        this._objects = [];
        this._input = definition.input;
        this._callback = definition.fn;
    }
    static givenDefinition(definition) {
        return new ArrayInitializer(definition);
    }
    initManagedObject() {
        this.addHandle(this._input.didChange.subscribe(() => {
            const newInput = this._input.toValues();
            if (newInput == null) {
                return;
            }
            for (let i = 0; i < newInput.length; i++) {
                if (this._previousInput[i] !== newInput[i]) {
                    const newValue = newInput[i];
                    const previousObject = this._objects[i];
                    const newObject = this._callback(newValue, i, previousObject);
                    if (newObject != null) {
                        this._objects[i] = newObject;
                    }
                    else {
                        delete this._objects[i];
                    }
                    if (previousObject !== newObject) {
                        if (previousObject != null) {
                            this.removeManagedObject(previousObject);
                        }
                        if (newObject != null) {
                            this.addManagedObject(newObject);
                        }
                    }
                }
            }
            if (this._previousInput.length > newInput.length) {
                for (let i = newInput.length; i < this._previousInput.length; i++) {
                    const object = this._objects[i];
                    if (object != null) {
                        this.removeManagedObject(object);
                    }
                }
                this._objects.splice(newInput.length, this._previousInput.length - newInput.length);
            }
            this._previousInput = newInput;
        }, true));
        this.addHandle(Handle_1.Handle.givenCallback(() => {
            this._objects = [];
        }));
    }
    toManagedObjects() {
        return [...this._objects];
    }
}
exports.ArrayInitializer = ArrayInitializer;
//# sourceMappingURL=index.js.map