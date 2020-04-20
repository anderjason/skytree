"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const assert = require("assert");
const optionalRandomItemGivenArray_1 = require("./optionalRandomItemGivenArray");
describe("optionalRandomItemGivenArray", () => {
    it("returns a random item from the array", () => {
        const first = "first";
        const second = "second";
        const third = "third";
        const items = [first, second, third];
        const result = optionalRandomItemGivenArray_1.optionalRandomItemGivenArray(items);
        assert(result != null);
        assert(result === first || result === second || result === third);
    });
    it("returns undefined if the array is empty", () => {
        const items = [];
        const result = optionalRandomItemGivenArray_1.optionalRandomItemGivenArray(items);
        assert(typeof result === "undefined");
    });
});
//# sourceMappingURL=optionalRandomItemGivenArray.spec.js.map