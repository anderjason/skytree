"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const assert = require("assert");
const arrayWithOrderFromValue_1 = require("./arrayWithOrderFromValue");
describe("arrayWithOrderFromValue", () => {
    it("returns an array sorted by the result of a function called on each item", () => {
        const input = [
            { player: "third", score: 5 },
            { player: "second", score: 3 },
            { player: "first", score: 1 },
        ];
        const result = arrayWithOrderFromValue_1.arrayWithOrderFromValue(input, (item) => item.score);
        assert(result[0].player === "first");
        assert(result[1].player === "second");
        assert(result[2].player === "third");
    });
    it("can return descending results", () => {
        const input = [
            { player: "third", score: 5 },
            { player: "second", score: 3 },
            { player: "first", score: 1 },
        ];
        const result = arrayWithOrderFromValue_1.arrayWithOrderFromValue(input, (item) => item.score, true);
        assert(result[0].player === "third");
        assert(result[1].player === "second");
        assert(result[2].player === "first");
    });
    it("handles an empty array", () => {
        const input = [];
        const result = arrayWithOrderFromValue_1.arrayWithOrderFromValue(input, (x) => 1);
        assert(result != null);
        assert(result.length === 0);
    });
});
//# sourceMappingURL=arrayWithOrderFromValue.spec.js.map