"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const assert = require("assert");
const stringWithKebabCase_1 = require("./stringWithKebabCase");
describe("stringWithKebabCase", () => {
    it("returns the expected results", () => {
        const beforeAfter = [
            ["hello world", "hello-world"],
            ["HELLO WORLD", "hello-world"],
            ["Hello World", "hello-world"],
            ["helloWorld", "hello-world"],
            ["hello_world", "hello-world"],
            ["hello-world", "hello-world"],
            ["HelloWorld", "hello-world"],
            ["hello__world", "hello-world"],
            ["hello--world", "hello-world"],
            ["", ""],
            ["1", "1"],
        ];
        beforeAfter.forEach((pair) => {
            const actual = stringWithKebabCase_1.stringWithKebabCase(pair[0]);
            const expected = pair[1];
            assert.strictEqual(actual, expected);
        });
    });
});
//# sourceMappingURL=stringWithKebabCase.spec.js.map