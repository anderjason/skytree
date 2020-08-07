"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.objectWithoutBlankValues = void 0;
function objectWithoutBlankValues(input) {
    const result = {};
    Object.keys(input).forEach((key) => {
        const value = input[key];
        if (value != null) {
            result[key] = value;
        }
    });
    return result;
}
exports.objectWithoutBlankValues = objectWithoutBlankValues;
//# sourceMappingURL=objectWithoutBlankValues.js.map