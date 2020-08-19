"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transformer = void 0;
const ManagedObject_1 = require("../ManagedObject");
const Observable_1 = require("../Observable");
class Transformer extends ManagedObject_1.ManagedObject {
    constructor(definition) {
        super();
        this.input = definition.input;
        this.output = definition.output || Observable_1.Observable.ofEmpty();
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
                this.output.setValue(convertedValue);
            }
        }, true));
    }
}
exports.Transformer = Transformer;
//# sourceMappingURL=index.js.map