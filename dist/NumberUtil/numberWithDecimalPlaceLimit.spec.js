"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const assert = require("assert");
const numberWithDecimalPlaceLimit_1 = require("./numberWithDecimalPlaceLimit");
describe("numberWithDecimalPlaceLimit", () => {
    it("trims digits from the end of a decimal number", () => {
        const input = 3.14159;
        assert(numberWithDecimalPlaceLimit_1.numberWithDecimalPlaceLimit(input, 2) === 3.14);
    });
    it("returns the original number if it has less than the requested number of decimal places", () => {
        const input = 3;
        assert(numberWithDecimalPlaceLimit_1.numberWithDecimalPlaceLimit(input, 2) === 3);
    });
});
//# sourceMappingURL=numberWithDecimalPlaceLimit.spec.js.map