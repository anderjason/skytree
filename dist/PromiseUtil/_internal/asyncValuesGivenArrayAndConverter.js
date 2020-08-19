"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncValuesGivenArrayAndConverter = void 0;
const asyncSequenceGivenArrayAndCallback_1 = require("./asyncSequenceGivenArrayAndCallback");
function asyncValuesGivenArrayAndConverter(input, fn) {
    const result = [];
    return asyncSequenceGivenArrayAndCallback_1.asyncSequenceGivenArrayAndCallback(input, (element, idx) => {
        return fn(element, idx).then((elementResult) => {
            result.push(elementResult);
        });
    }).then(() => {
        return result;
    });
}
exports.asyncValuesGivenArrayAndConverter = asyncValuesGivenArrayAndConverter;
//# sourceMappingURL=asyncValuesGivenArrayAndConverter.js.map