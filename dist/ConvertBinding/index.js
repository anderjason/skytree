"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConvertBinding = void 0;
const Actor_1 = require("../Actor");
const observable_1 = require("@anderjason/observable");
class ConvertBinding extends Actor_1.Actor {
    constructor(props) {
        super(props);
        this._output =
            props.output || observable_1.Observable.ofEmpty(observable_1.Observable.isStrictEqual);
        this.output = observable_1.ReadOnlyObservable.givenObservable(this._output);
    }
    onActivate() {
        let latestChangeId = 0;
        this.cancelOnDeactivate(this.props.input.didChange.subscribe(async (value) => {
            latestChangeId += 1;
            if (latestChangeId > 10000) {
                latestChangeId = 0;
            }
            let thisChangeId = latestChangeId;
            const convertedValue = await this.props.fn(value);
            if (thisChangeId === latestChangeId) {
                this._output.setValue(convertedValue);
            }
        }, true));
    }
}
exports.ConvertBinding = ConvertBinding;
//# sourceMappingURL=index.js.map