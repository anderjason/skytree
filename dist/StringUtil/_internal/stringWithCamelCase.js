"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringWithCamelCase = void 0;
const stringWithSpaceCase_1 = require("./stringWithSpaceCase");
function stringWithCamelCase(input) {
    if (input == null) {
        throw new Error("input is required");
    }
    return stringWithSpaceCase_1.stringWithSpaceCase(input).replace(/\s(\w)/g, (matches, letter) => {
        return letter.toUpperCase();
    });
}
exports.stringWithCamelCase = stringWithCamelCase;
//# sourceMappingURL=stringWithCamelCase.js.map