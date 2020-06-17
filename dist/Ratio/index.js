"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ratio = void 0;
const Percent_1 = require("../Percent");
class Ratio {
    constructor(decimalValue) {
        this._value = decimalValue;
    }
    static givenDecimal(decimalValue) {
        return new Ratio(decimalValue);
    }
    static givenFraction(numerator, denominator) {
        if (denominator == 0) {
            throw new Error("Denominator must not be 0");
        }
        return new Ratio(numerator / denominator);
    }
    static givenValueAndRange(value, min, max) {
        if (min > max) {
            throw new Error("Min must be less than max");
        }
        if (value < min) {
            return Ratio.givenDecimal(0);
        }
        if (value > max) {
            return Ratio.givenDecimal(1);
        }
        return Ratio.givenFraction(value - min, max - min);
    }
    static givenPercent(percent) {
        const n = percent.toNumber();
        return new Ratio(n / 100);
    }
    toDecimal() {
        return this._value;
    }
    toPercent() {
        return Percent_1.Percent.givenRatio(this);
    }
    toString() {
        return this._value.toString();
    }
    withAddedRatio(addRatio) {
        return this.withAddedDecimal(addRatio.toDecimal());
    }
    withAddedDecimal(decimal) {
        return Ratio.givenDecimal(this._value + decimal);
    }
    withMultipliedRatio(multiplyRatio) {
        return this.withMultipliedDecimal(multiplyRatio.toDecimal());
    }
    withMultipliedDecimal(decimal) {
        return Ratio.givenDecimal(this._value * decimal);
    }
}
exports.Ratio = Ratio;
//# sourceMappingURL=index.js.map