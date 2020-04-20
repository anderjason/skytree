"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const assert = require("assert");
const _1 = require(".");
const Percent_1 = require("../Percent");
describe("Ratio", () => {
    it("can be created from a decimal", () => {
        const ratio = _1.Ratio.ofDecimal(0.5);
        assert(ratio.toString() === "0.5");
    });
    it("can be created from a fraction", () => {
        const ratio = _1.Ratio.ofFraction(2, 10);
        assert(ratio.toString() === "0.2");
    });
    it("can be created from a value and range", () => {
        const ratio = _1.Ratio.ofValueAndRange(20, 0, 100);
        assert(ratio.toString() === "0.2");
    });
    it("can be created from a percent", () => {
        const percent = Percent_1.Percent.ofNumber(50);
        const ratio = _1.Ratio.ofPercent(percent);
        assert(ratio.toString() === "0.5");
    });
    it("can be converted to a decimal number", () => {
        const ratio = _1.Ratio.ofDecimal(0.5);
        assert(ratio.toDecimal() === 0.5);
    });
    it("can be converted to a percent", () => {
        const ratio = _1.Ratio.ofDecimal(0.5);
        const percent = ratio.toPercent();
        assert(percent.toString() === "50%");
    });
    it("can be converted to a string", () => {
        const ratio = _1.Ratio.ofDecimal(0.5);
        assert(ratio.toString() === "0.5");
    });
    it("can be added to another ratio", () => {
        const ratio1 = _1.Ratio.ofDecimal(0.5);
        const ratio2 = _1.Ratio.ofDecimal(0.2);
        const result = ratio1.withAddedRatio(ratio2);
        assert(result.toDecimal() === 0.7);
    });
    it("can be added to a decimal", () => {
        const ratio1 = _1.Ratio.ofDecimal(0.5);
        const result = ratio1.withAddedDecimal(0.2);
        assert(result.toDecimal() === 0.7);
    });
    it("can be multiplied by another ratio", () => {
        const ratio1 = _1.Ratio.ofDecimal(0.5);
        const ratio2 = _1.Ratio.ofDecimal(0.5);
        const result = ratio1.withMultipliedRatio(ratio2);
        assert(result.toDecimal() === 0.25);
    });
    it("can be multiplied by a decimal", () => {
        const ratio1 = _1.Ratio.ofDecimal(0.5);
        const result = ratio1.withMultipliedDecimal(0.5);
        assert(result.toDecimal() === 0.25);
    });
});
//# sourceMappingURL=index.spec.js.map