"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const assert = require("assert");
const numberWithHardLimit_1 = require("./numberWithHardLimit");
describe("numberWithHardLimit", () => {
    it("limits a number to the specified range", () => {
        const input = 5;
        assert(numberWithHardLimit_1.numberWithHardLimit(input, 1, 3) === 3);
        assert(numberWithHardLimit_1.numberWithHardLimit(input, 1, 10) === 5);
        assert(numberWithHardLimit_1.numberWithHardLimit(input, 10, 30) === 10);
    });
});
//# sourceMappingURL=numberWithHardLimit.spec.js.map