"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
class Binding extends __1.ManagedObject {
    constructor(input, output, converter) {
        super();
        this.input = input;
        this.output = output;
        this._converter = converter;
    }
    static ofObservables(input, output, converter) {
        return new Binding(input, output, converter);
    }
    initManagedObject() {
        this.addHandle(this.input.didChange.subscribe((value) => {
            const convertedValue = this._converter(value);
            this.output.setValue(convertedValue);
        }, true));
    }
}
exports.Binding = Binding;
//# sourceMappingURL=index.js.map