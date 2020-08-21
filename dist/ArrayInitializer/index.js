"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrayInitializer = void 0;
const ManagedObject_1 = require("../ManagedObject");
const Handle_1 = require("../Handle");
const ObservableArray_1 = require("../ObservableArray");
class ArrayInitializer extends ManagedObject_1.ManagedObject {
    constructor(definition) {
        super();
        this.objects = ObservableArray_1.ObservableArray.ofEmpty();
        this._previousInput = [];
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
                    const previousObject = this.objects.toOptionalValueGivenIndex(i);
                    const newObject = this._callback(newValue, i, previousObject);
                    this.objects.replaceValueAtIndex(i, newObject);
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
                    const object = this.objects.toOptionalValueGivenIndex(i);
                    if (object != null) {
                        this.removeManagedObject(object);
                    }
                }
                this.objects.removeAllWhere((v, i) => i >= newInput.length);
            }
            this._previousInput = newInput;
        }, true));
        this.addHandle(Handle_1.Handle.givenCallback(() => {
            this.objects.clear();
        }));
    }
}
exports.ArrayInitializer = ArrayInitializer;
//# sourceMappingURL=index.js.map