"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const assert = require("assert");
const stringWithInitialCapital_1 = require("./stringWithInitialCapital");
describe("stringWithInitialCapital", () => {
    it("returns the expected results", () => {
        const beforeAfter = [
            ["hello world", "Hello world"],
            ["Hello world", "Hello world"],
            ["HELLO WORLD", "Hello world"],
            ["", ""],
        ];
        beforeAfter.forEach((pair) => {
            const actual = stringWithInitialCapital_1.stringWithInitialCapital(pair[0]);
            const expected = pair[1];
            assert.strictEqual(actual, expected);
        });
    });
});
//# sourceMappingURL=stringWithInitialCapital.spec.js.map