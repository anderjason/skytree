"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrayInitializer = void 0;
const observable_1 = require("@anderjason/observable");
const ManagedObject_1 = require("../ManagedObject");
class ArrayInitializer extends ManagedObject_1.ManagedObject {
    constructor() {
        super(...arguments);
        this._output = observable_1.ObservableArray.ofEmpty();
        this.output = observable_1.ReadOnlyObservableArray.givenObservableArray(this._output);
        this._previousInput = [];
    }
    onActivate() {
        this.cancelOnDeactivate(this.props.input.didChange.subscribe(() => {
            const newInput = this.props.input.toValues();
            if (newInput == null) {
                return;
            }
            for (let i = 0; i < newInput.length; i++) {
                if (this._previousInput[i] !== newInput[i]) {
                    const newValue = newInput[i];
                    const previousObject = this._output.toOptionalValueGivenIndex(i);
                    const newObject = this.props.fn(newValue, i, previousObject);
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
                    this._output.replaceValueAtIndex(i, newObject);
                }
            }
            if (this._previousInput.length > newInput.length) {
                for (let i = newInput.length; i < this._previousInput.length; i++) {
                    const object = this._output.toOptionalValueGivenIndex(i);
                    if (object != null) {
                        this.removeManagedObject(object);
                    }
                }
                this._output.removeAllWhere((v, i) => i >= newInput.length);
            }
            this._previousInput = newInput;
        }, true));
        this.cancelOnDeactivate(new observable_1.Receipt(() => {
            this._output.clear();
        }));
    }
}
exports.ArrayInitializer = ArrayInitializer;
//# sourceMappingURL=index.js.map