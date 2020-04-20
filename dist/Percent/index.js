"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Ratio_1 = require("../Ratio");
class Percent {
    constructor(value) {
        this._value = value;
    }
    static ofNumber(value) {
        return new Percent(value);
    }
    static ofRatio(ratio) {
        return new Percent(ratio.toDecimal() * 100);
    }
    static ofString(value) {
        return new Percent(parseFloat(value));
    }
    toString(fractionDigits) {
        return `${this._value.toFixed(fractionDigits)}%`;
    }
    toRatio() {
        return Ratio_1.Ratio.ofPercent(this);
    }
    toNumber() {
        return this._value;
    }
}
exports.Percent = Percent;
//# sourceMappingURL=index.js.map