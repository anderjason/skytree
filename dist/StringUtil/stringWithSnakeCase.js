"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringWithSnakeCase = void 0;
const stringWithNoCase_1 = require("./stringWithNoCase");
function stringWithSnakeCase(input) {
    if (input == null) {
        throw new Error("input is required");
    }
    return stringWithNoCase_1.stringWithNoCase(input)
        .replace(/[\W_]+(.|$)/g, (matches, match) => {
        return match ? "_" + match : "";
    })
        .trim();
}
exports.stringWithSnakeCase = stringWithSnakeCase;
//# sourceMappingURL=stringWithSnakeCase.js.map