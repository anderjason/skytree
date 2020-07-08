"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const assert = require("assert");
const stringWithSnakeCase_1 = require("./stringWithSnakeCase");
describe("stringWithSnakeCase", () => {
    it("returns the expected results", () => {
        const beforeAfter = [
            ["hello world", "hello_world"],
            ["HELLO WORLD", "hello_world"],
            ["Hello World", "hello_world"],
            ["helloWorld", "hello_world"],
            ["hello_world", "hello_world"],
            ["hello-world", "hello_world"],
            ["HelloWorld", "hello_world"],
            ["hello__world", "hello_world"],
            ["", ""],
            ["1", "1"],
        ];
        beforeAfter.forEach((pair) => {
            const actual = stringWithSnakeCase_1.stringWithSnakeCase(pair[0]);
            const expected = pair[1];
            assert.strictEqual(actual, expected);
        });
    });
});
//# sourceMappingURL=stringWithSnakeCase.spec.js.map