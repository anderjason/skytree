"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transformer = void 0;
const ManagedObject_1 = require("../ManagedObject");
const observable_1 = require("@anderjason/observable");
class Transformer extends ManagedObject_1.ManagedObject {
    constructor(definition) {
        super();
        this.input = definition.input;
        this._output = definition.output || observable_1.Observable.ofEmpty();
        this.output = observable_1.ReadOnlyObservable.givenObservable(this._output);
        this._converter = definition.fn;
    }
    static givenDefinition(definition) {
        return new Transformer(definition);
    }
    initManagedObject() {
        let latestChangeId = 0;
        this.addHandle(this.input.didChange.subscribe(async (value) => {
            latestChangeId += 1;
            if (latestChangeId > 10000) {
                latestChangeId = 0;
            }
            let thisChangeId = latestChangeId;
            const convertedValue = await this._converter(value);
            if (thisChangeId === latestChangeId) {
                this._output.setValue(convertedValue);
            }
        }, true));
    }
}
exports.Transformer = Transformer;
//# sourceMappingURL=index.js.map