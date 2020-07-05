"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringWithCase = void 0;
const stringWithCamelCase_1 = require("./stringWithCamelCase");
const stringWithKebabCase_1 = require("./stringWithKebabCase");
const stringWithInitialCapital_1 = require("./stringWithInitialCapital");
const stringWithPascalCase_1 = require("./stringWithPascalCase");
const stringWithSnakeCase_1 = require("./stringWithSnakeCase");
const stringWithSpaceCase_1 = require("./stringWithSpaceCase");
function stringWithCase(input, stringCase) {
    switch (stringCase) {
        case "camelCase":
            return stringWithCamelCase_1.stringWithCamelCase(input);
        case "Initial capital":
            return stringWithInitialCapital_1.stringWithInitialCapital(input);
        case "kebab-case":
            return stringWithKebabCase_1.stringWithKebabCase(input);
        case "PascalCase":
            return stringWithPascalCase_1.stringWithPascalCase(input);
        case "snake_case":
            return stringWithSnakeCase_1.stringWithSnakeCase(input);
        case "space case":
            return stringWithSpaceCase_1.stringWithSpaceCase(input);
        default:
            throw new Error("Unsupported string case");
    }
}
exports.stringWithCase = stringWithCase;
//# sourceMappingURL=stringWithCase.js.map