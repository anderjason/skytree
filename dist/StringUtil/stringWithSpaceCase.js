"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringWithSpaceCase = void 0;
const stringWithNoCase_1 = require("./stringWithNoCase");
function stringWithSpaceCase(input) {
    if (input == null) {
        throw new Error("input is required");
    }
    return stringWithNoCase_1.stringWithNoCase(input)
        .replace(/[\W_]+(.|$)/g, (matches, match) => {
        return match ? " " + match : "";
    })
        .trim();
}
exports.stringWithSpaceCase = stringWithSpaceCase;
//# sourceMappingURL=stringWithSpaceCase.js.map