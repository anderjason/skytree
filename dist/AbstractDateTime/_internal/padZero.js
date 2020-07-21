"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringWithPaddedZeros = void 0;
function stringWithPaddedZeros(input, width) {
    let result = String(input);
    return result.length >= width
        ? result
        : new Array(width - result.length + 1).join("0") + result;
}
exports.stringWithPaddedZeros = stringWithPaddedZeros;
//# sourceMappingURL=padZero.js.map