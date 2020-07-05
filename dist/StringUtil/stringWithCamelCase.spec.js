"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const assert = require("assert");
const stringWithCamelCase_1 = require("./stringWithCamelCase");
describe("stringWithCamelCase", () => {
    it("returns the expected results", () => {
        const beforeAfter = [
            ["hello world", "helloWorld"],
            ["hello  world", "helloWorld"],
            ["hello World", "helloWorld"],
            ["helloWorld", "helloWorld"],
            ["hello world with multiple words", "helloWorldWithMultipleWords"],
            ["hello", "hello"],
            ["HELLO WORLD", "helloWorld"],
            ["", ""],
            ["hello 1world", "hello1world"],
            ["hello 1 world", "hello1World"],
            ["1 world", "1World"],
            ["-", ""],
            ["hello-world", "helloWorld"],
            ["hello - world", "helloWorld"],
        ];
        beforeAfter.forEach((pair, idx) => {
            const actual = stringWithCamelCase_1.stringWithCamelCase(pair[0]);
            const expected = pair[1];
            if (actual !== expected) {
                console.log(`${idx} - Actual: '${actual}', expected: '${expected}'`);
            }
            assert(actual === expected);
        });
    });
});
//# sourceMappingURL=stringWithCamelCase.spec.js.map