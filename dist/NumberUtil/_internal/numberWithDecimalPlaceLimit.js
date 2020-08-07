"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.numberWithDecimalPlaceLimit = void 0;
function numberWithDecimalPlaceLimit(input, digitsAfterDecimalPoint = 1) {
    return parseFloat(input.toFixed(digitsAfterDecimalPoint));
}
exports.numberWithDecimalPlaceLimit = numberWithDecimalPlaceLimit;
//# sourceMappingURL=numberWithDecimalPlaceLimit.js.map