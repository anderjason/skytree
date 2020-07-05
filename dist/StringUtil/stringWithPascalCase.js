"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringWithPascalCase = void 0;
const stringWithCamelCase_1 = require("./stringWithCamelCase");
function stringWithPascalCase(input) {
    if (input == null) {
        throw new Error("input is required");
    }
    const camel = stringWithCamelCase_1.stringWithCamelCase(input);
    return camel.charAt(0).toUpperCase() + camel.slice(1);
}
exports.stringWithPascalCase = stringWithPascalCase;
//# sourceMappingURL=stringWithPascalCase.js.map