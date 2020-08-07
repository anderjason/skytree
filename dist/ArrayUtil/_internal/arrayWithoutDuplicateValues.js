"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.arrayWithoutDuplicateValues = void 0;
function arrayWithoutDuplicateValues(values) {
    const seen = new Set();
    const result = [];
    // preserve order of the items
    values.forEach((item) => {
        if (!seen.has(item)) {
            seen.add(item);
            result.push(item);
        }
    });
    return result;
}
exports.arrayWithoutDuplicateValues = arrayWithoutDuplicateValues;
//# sourceMappingURL=arrayWithoutDuplicateValues.js.map