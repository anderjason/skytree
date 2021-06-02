"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountActivator = void 0;
const observable_1 = require("@anderjason/observable");
const Actor_1 = require("../Actor");
class CountActivator extends Actor_1.Actor {
    constructor(props) {
        super(props);
        this._output = observable_1.ObservableArray.ofEmpty();
        this.output = observable_1.ReadOnlyObservableArray.givenObservableArray(this._output);
        this._input = observable_1.Observable.givenValueOrObservable(this.props.input);
    }
    onActivate() {
        this.cancelOnDeactivate(this._input.didChange.subscribe((newCount, prevCount = 0) => {
            if (newCount == null) {
                return;
            }
            if (newCount > prevCount) {
                for (let i = prevCount; i < newCount; i++) {
                    const newObject = this.props.fn(i);
                    if (newObject != null) {
                        this.addActor(newObject);
                        this._output.replaceValueAtIndex(i, newObject);
                    }
                }
            }
            else {
                for (let i = newCount; i < prevCount; i++) {
                    const object = this._output.toOptionalValueGivenIndex(i);
                    this.removeActor(object);
                }
                this._output.removeAllWhere((v, idx) => idx >= newCount);
            }
        }, true));
        this.cancelOnDeactivate(new observable_1.Receipt(() => {
            this._output.clear();
        }));
    }
}
exports.CountActivator = CountActivator;
//# sourceMappingURL=index.js.map