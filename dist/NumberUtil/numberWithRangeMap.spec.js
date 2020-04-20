"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const assert = require("assert");
const numberWithRangeMap_1 = require("./numberWithRangeMap");
describe("numberWithRangeMap", () => {
    it("adjusts a number from the input range to the corresponding point in the output range", () => {
        const input = 5;
        assert(numberWithRangeMap_1.numberWithRangeMap(input, 0, 10, 0, 100) === 50);
        assert(numberWithRangeMap_1.numberWithRangeMap(input, 0, 5, 0, 100) === 100);
    });
    it("clips values to the input range before scaling", () => {
        const input = 5;
        assert(numberWithRangeMap_1.numberWithRangeMap(input, 0, 1, 0, 100) === 100);
        assert(numberWithRangeMap_1.numberWithRangeMap(input, 10, 100, 0, 100) === 0);
    });
});
//# sourceMappingURL=numberWithRangeMap.spec.js.map