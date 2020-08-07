"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.arrayWithValue = void 0;
function arrayWithValue(input, value, allowDuplicates) {
    const result = [...input];
    if (result.indexOf(value) === -1 || allowDuplicates) {
        result.push(value);
    }
    return result;
}
exports.arrayWithValue = arrayWithValue;
//# sourceMappingURL=arrayWithValue.js.map