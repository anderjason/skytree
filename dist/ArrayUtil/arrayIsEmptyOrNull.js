"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.arrayIsEmptyOrNull = void 0;
function arrayIsEmptyOrNull(input) {
    if (input == null) {
        return true;
    }
    if (!Array.isArray(input)) {
        throw new Error("input must be an array");
    }
    return input.length === 0;
}
exports.arrayIsEmptyOrNull = arrayIsEmptyOrNull;
//# sourceMappingURL=arrayIsEmptyOrNull.js.map