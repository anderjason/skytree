"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.numberArrayGivenRange = void 0;
function numberArrayGivenRange(firstNumber, lastNumber) {
    const result = [];
    if (lastNumber === firstNumber) {
        return [firstNumber];
    }
    if (firstNumber < lastNumber) {
        for (let i = firstNumber; i < lastNumber + 1; i++) {
            result.push(i);
        }
    }
    else {
        for (let i = lastNumber; i > firstNumber - 1; i--) {
            result.push(i);
        }
    }
    return result;
}
exports.numberArrayGivenRange = numberArrayGivenRange;
//# sourceMappingURL=numberArrayGivenRange.js.map