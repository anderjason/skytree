"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringWithKebabCase = void 0;
const stringWithNoCase_1 = require("./stringWithNoCase");
function stringWithKebabCase(input) {
    if (input == null) {
        throw new Error("input is required");
    }
    return stringWithNoCase_1.stringWithNoCase(input)
        .replace(/[\W_]+(.|$)/g, (matches, match) => {
        return match ? "-" + match : "";
    })
        .trim();
}
exports.stringWithKebabCase = stringWithKebabCase;
//# sourceMappingURL=stringWithKebabCase.js.map