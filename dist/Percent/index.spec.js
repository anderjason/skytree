"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const assert = require("assert");
const _1 = require(".");
const Ratio_1 = require("../Ratio");
describe("Percent", () => {
    it("can be created from a number", () => {
        const percent = _1.Percent.ofNumber(50);
        assert(percent.toString() === "50%");
    });
    it("can be created from a ratio", () => {
        const ratio = Ratio_1.Ratio.ofDecimal(0.5);
        const percent = _1.Percent.ofRatio(ratio);
        assert(percent.toString() === "50%");
    });
    it("can be created from a string", () => {
        const percent = _1.Percent.ofString("50%");
        assert(percent.toString() === "50%");
    });
    it("can be converted to a ratio", () => {
        const percent = _1.Percent.ofNumber(50);
        const ratio = percent.toRatio();
        assert(ratio.toString() === "0.5");
    });
    it("can be converted to a number", () => {
        const percent = _1.Percent.ofNumber(50);
        assert(percent.toNumber() === 50);
    });
});
//# sourceMappingURL=index.spec.js.map