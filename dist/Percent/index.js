"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Percent = void 0;
const Ratio_1 = require("../Ratio");
class Percent {
    constructor(value) {
        this._value = value;
    }
    static isEqual(a, b) {
        if (a == null && b == null) {
            return true;
        }
        if (a == null || b == null) {
            return false;
        }
        return a.isEqual(b);
    }
    static givenNumber(value) {
        return new Percent(value);
    }
    static givenRatio(ratio) {
        return new Percent(ratio.toDecimal() * 100);
    }
    static givenString(value) {
        return new Percent(parseFloat(value));
    }
    static ofZero() {
        return new Percent(0);
    }
    isEqual(other) {
        if (other == null) {
            return false;
        }
        return this._value === other._value;
    }
    toString(fractionDigits) {
        return `${this._value.toFixed(fractionDigits)}%`;
    }
    toRatio() {
        return Ratio_1.Ratio.givenPercent(this);
    }
    toNumber() {
        return this._value;
    }
}
exports.Percent = Percent;
//# sourceMappingURL=index.js.map