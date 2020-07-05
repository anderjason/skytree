"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const assert = require("assert");
const stringWithSpaceCase_1 = require("./stringWithSpaceCase");
describe("stringWithSpaceCase", () => {
    it("returns the expected results", () => {
        const beforeAfter = [
            ["hello world", "hello world"],
            ["HELLO WORLD", "hello world"],
            ["hello   world", "hello world"],
            ["Hello World", "hello world"],
            ["helloWorld", "hello world"],
            ["hello_world", "hello world"],
            ["hello-world", "hello world"],
            ["HelloWorld", "hello world"],
            ["", ""],
            [" ", ""],
            ["-", ""],
            ["1", "1"],
        ];
        beforeAfter.forEach((pair, idx) => {
            const actual = stringWithSpaceCase_1.stringWithSpaceCase(pair[0]);
            const expected = pair[1];
            if (actual !== expected) {
                console.log(`${idx} - Actual: '${actual}', expected: '${expected}'`);
            }
            assert(actual === expected);
        });
    });
});
//# sourceMappingURL=stringWithSpaceCase.spec.js.map