"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const assert = require("assert");
const stringIsEmpty_1 = require("./stringIsEmpty");
describe("stringIsEmpty", () => {
    it("returns true for null input", () => {
        assert(stringIsEmpty_1.stringIsEmpty(null) === true);
    });
    it("returns true for an empty string", () => {
        assert(stringIsEmpty_1.stringIsEmpty("") === true);
    });
    it("returns false for a string with only whitespace", () => {
        assert(stringIsEmpty_1.stringIsEmpty(" ") === false);
    });
    it("returns false for a string with characters", () => {
        assert(stringIsEmpty_1.stringIsEmpty("abc") === false);
    });
});
//# sourceMappingURL=stringIsEmpty.spec.js.map