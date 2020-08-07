"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.arrayGivenPattern = void 0;
function arrayGivenPattern(input, length) {
    if (input == null) {
        throw new Error("input is required");
    }
    if (length == null) {
        throw new Error("length is required");
    }
    if (length < 0) {
        throw new Error("length must not be negative");
    }
    if (length == 0) {
        return [];
    }
    const result = [];
    for (let i = 0; i < length; i++) {
        const inputIndex = i % input.length;
        result.push(input[inputIndex]);
    }
    return result;
}
exports.arrayGivenPattern = arrayGivenPattern;
//# sourceMappingURL=arrayGivenPattern.js.map