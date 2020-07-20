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
        this._converter = definition.converter;
    }
    static givenDefinition(definition) {
        return new Transformer(definition);
    }
    initManagedObject() {
        this.addHandle(this.input.didChange.subscribe((value) => {
            const convertedValue = this._converter(value);
            this.output.setValue(convertedValue);
        }, true));
    }
}
exports.Transformer = Transformer;
//# sourceMappingURL=index.js.map