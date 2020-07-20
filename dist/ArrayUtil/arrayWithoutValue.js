"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.arrayWithoutValue = void 0;
function arrayWithoutValue(input, excludeValue) {
    if (input == null) {
        throw new Error("input is required");
    }
    if (excludeValue == null) {
        return [...input];
    }
    return input.filter((item) => item !== excludeValue);
}
exports.arrayWithoutValue = arrayWithoutValue;
//# sourceMappingURL=arrayWithoutValue.js.map