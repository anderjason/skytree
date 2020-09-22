"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExclusiveInitializer = void 0;
const observable_1 = require("@anderjason/observable");
const ManagedObject_1 = require("../ManagedObject");
class ExclusiveInitializer extends ManagedObject_1.ManagedObject {
    constructor() {
        super(...arguments);
        this._output = observable_1.Observable.ofEmpty(observable_1.Observable.isStrictEqual);
        this.output = observable_1.ReadOnlyObservable.givenObservable(this._output);
    }
    onActivate() {
        if (this.props.input != null && this.props.fn != null) {
            this.cancelOnDeactivate(this.props.input.didChange.subscribe((newValue, oldValue) => {
                const newObject = this.props.fn(newValue, oldValue, this._output.value);
                if (newObject === this._lastObject) {
                    return;
                }
                if (this._lastObject != null) {
                    this.removeManagedObject(this._lastObject);
                    this._lastObject = undefined;
                }
                if (newObject != null) {
                    this._lastObject = newObject;
                    this.addManagedObject(newObject);
                }
                this._output.setValue(this._lastObject);
            }, true));
        }
        this.cancelOnDeactivate(new observable_1.Receipt(() => {
            this._output.setValue(undefined);
        }));
    }
}
exports.ExclusiveInitializer = ExclusiveInitializer;
//# sourceMappingURL=index.js.map