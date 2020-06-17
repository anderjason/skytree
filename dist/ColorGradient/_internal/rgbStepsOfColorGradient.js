"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rgbStepsOfColorGradient = void 0;
const Ratio_1 = require("../../Ratio");
const ArrayUtil_1 = require("../../ArrayUtil");
function rgbStepsOfColorGradient(colorGradient, totalSteps) {
    if (totalSteps < 2) {
        throw new Error("At least two total steps are required");
    }
    return ArrayUtil_1.ArrayUtil.numberArrayGivenRange(0, totalSteps - 1).map((n) => colorGradient.toRgbInterpolatedColor(Ratio_1.Ratio.givenFraction(n, totalSteps - 1)));
}
exports.rgbStepsOfColorGradient = rgbStepsOfColorGradient;
//# sourceMappingURL=rgbStepsOfColorGradient.js.map