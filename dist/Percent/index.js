"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Percent = void 0;
const __1 = require("..");
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
    static givenString(value) {
        if (value == null) {
            throw new Error("Value is required");
        }
        if (value.includes("%")) {
            return Percent.givenFraction(parseFloat(value), 100);
        }
        else {
            return Percent.givenFraction(parseFloat(value), 1);
        }
    }
    static givenFraction(numerator, denominator) {
        if (denominator == 0) {
            throw new Error("Denominator must not be 0");
        }
        return new Percent(numerator / denominator);
    }
    static ofZero() {
        return new Percent(0);
    }
    static ofFull() {
        return new Percent(1);
    }
    static givenPortableString(input, fallbackValue) {
        if (__1.StringUtil.stringIsEmpty(input)) {
            return fallbackValue;
        }
        try {
            const obj = JSON.parse(input);
            if (typeof obj !== "object") {
                return fallbackValue;
            }
            const { value } = obj;
            if (value == null) {
                return fallbackValue;
            }
            return new Percent(value);
        }
        catch (err) {
            console.warn(err);
            return fallbackValue;
        }
    }
    get isZero() {
        return this._value === 0;
    }
    get isFull() {
        return this._value === 1;
    }
    isEqual(other) {
        if (other == null) {
            return false;
        }
        return this._value === other._value;
    }
    toString(fractionDigits) {
        return `${this.toNumber(100).toFixed(fractionDigits)}%`;
    }
    toNumber(denominator) {
        return this._value * denominator;
    }
    toPortableString() {
        const obj = {
            value: this._value,
        };
        return JSON.stringify(obj);
    }
    withAddedPercent(other) {
        return new Percent(this._value + other._value);
    }
    withHardLimit() {
        return new Percent(__1.NumberUtil.numberWithHardLimit(this._value, 0, 1));
    }
}
exports.Percent = Percent;
//# sourceMappingURL=index.js.map