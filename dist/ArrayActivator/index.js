"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrayActivator = void 0;
const observable_1 = require("@anderjason/observable");
const Actor_1 = require("../Actor");
class ArrayActivator extends Actor_1.Actor {
    constructor(props) {
        super(props);
        this._output = observable_1.ObservableArray.ofEmpty();
        this.output = observable_1.ReadOnlyObservableArray.givenObservableArray(this._output);
        this._previousInput = [];
        if (observable_1.ObservableArray.isObservableArray(props.input)) {
            this._observableInput = props.input;
        }
        else {
            this._observableInput = observable_1.ObservableArray.givenValues(props.input);
        }
    }
    onActivate() {
        this.cancelOnDeactivate(this._observableInput.didChange.subscribe((newInput) => {
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
                            this.removeActor(previousObject);
                        }
                        if (newObject != null) {
                            this.addActor(newObject);
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
                        this.removeActor(object);
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
exports.ArrayActivator = ArrayActivator;
//# sourceMappingURL=index.js.map