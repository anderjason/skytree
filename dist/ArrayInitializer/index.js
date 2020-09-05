"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrayInitializer = void 0;
const observable_1 = require("@anderjason/observable");
const ManagedObject_1 = require("../ManagedObject");
class ArrayInitializer extends ManagedObject_1.ManagedObject {
    constructor(definition) {
        super();
        this._objects = observable_1.ObservableArray.ofEmpty();
        this.objects = observable_1.ReadOnlyObservableArray.givenObservableArray(this._objects);
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
                    const previousObject = this._objects.toOptionalValueGivenIndex(i);
                    const newObject = this._callback(newValue, i, previousObject);
                    if (previousObject !== newObject) {
                        if (previousObject != null) {
                            this.removeManagedObject(previousObject);
                        }
                        if (newObject != null) {
                            this.addManagedObject(newObject);
                        }
                    }
                    // this needs to happen after adding the new object above,
                    // so the object is initialized by the time this observable updates
                    this._objects.replaceValueAtIndex(i, newObject);
                }
            }
            if (this._previousInput.length > newInput.length) {
                for (let i = newInput.length; i < this._previousInput.length; i++) {
                    const object = this._objects.toOptionalValueGivenIndex(i);
                    if (object != null) {
                        this.removeManagedObject(object);
                    }
                }
                this._objects.removeAllWhere((v, i) => i >= newInput.length);
            }
            this._previousInput = newInput;
        }, true));
        this.addHandle(observable_1.Handle.givenCallback(() => {
            this._objects.clear();
        }));
    }
}
exports.ArrayInitializer = ArrayInitializer;
//# sourceMappingURL=index.js.map