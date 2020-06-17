"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.numberWithRangeMap = void 0;
const numberWithHardLimit_1 = require("./numberWithHardLimit");
function numberWithRangeMap(input, inputLow, inputHigh, outputLow, outputHigh) {
    const result = ((input - inputLow) * (outputHigh - outputLow)) / (inputHigh - inputLow) +
        outputLow;
    return numberWithHardLimit_1.numberWithHardLimit(result, Math.min(outputLow, outputHigh), Math.max(outputLow, outputHigh));
}
exports.numberWithRangeMap = numberWithRangeMap;
//# sourceMappingURL=numberWithRangeMap.js.map