"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const assert = require("assert");
const stringWithPascalCase_1 = require("./stringWithPascalCase");
describe("stringWithPascalCase", () => {
    it("returns the expected results", () => {
        const beforeAfter = [
            ["hello world", "HelloWorld"],
            ["hello  world", "HelloWorld"],
            ["hello World", "HelloWorld"],
            ["helloWorld", "HelloWorld"],
            ["hello", "Hello"],
            ["HELLO WORLD", "HelloWorld"],
            ["", ""],
            ["hello 1world", "Hello1world"],
            ["hello 1 world", "Hello1World"],
            ["1 world", "1World"],
            ["-", ""],
            ["hello-world", "HelloWorld"],
            ["hello - world", "HelloWorld"],
        ];
        beforeAfter.forEach((pair) => {
            const actual = stringWithPascalCase_1.stringWithPascalCase(pair[0]);
            const expected = pair[1];
            assert.strictEqual(actual, expected);
        });
    });
});
//# sourceMappingURL=stringWithPascalCase.spec.js.map