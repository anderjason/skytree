"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Percent_1 = require("../Percent");
class Ratio {
    constructor(decimalValue) {
        this._value = decimalValue;
    }
    static ofDecimal(decimalValue) {
        return new Ratio(decimalValue);
    }
    static ofFraction(numerator, denominator) {
        if (denominator == 0) {
            throw new Error("Denominator must not be 0");
        }
        return new Ratio(numerator / denominator);
    }
    static ofValueAndRange(value, min, max) {
        if (min > max) {
            throw new Error("Min must be less than max");
        }
        if (value < min) {
            return Ratio.ofDecimal(0);
        }
        if (value > max) {
            return Ratio.ofDecimal(1);
        }
        return Ratio.ofFraction(value - min, max - min);
    }
    static ofPercent(percent) {
        const n = percent.toNumber();
        return new Ratio(n / 100);
    }
    toDecimal() {
        return this._value;
    }
    toPercent() {
        return Percent_1.Percent.ofRatio(this);
    }
    toString() {
        return this._value.toString();
    }
    withAddedRatio(addRatio) {
        return this.withAddedDecimal(addRatio.toDecimal());
    }
    withAddedDecimal(decimal) {
        return Ratio.ofDecimal(this._value + decimal);
    }
    withMultipliedRatio(multiplyRatio) {
        return this.withMultipliedDecimal(multiplyRatio.toDecimal());
    }
    withMultipliedDecimal(decimal) {
        return Ratio.ofDecimal(this._value * decimal);
    }
}
exports.Ratio = Ratio;
//# sourceMappingURL=index.js.map