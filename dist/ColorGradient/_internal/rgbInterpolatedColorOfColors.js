"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rgbInterpolatedColorOfColors = void 0;
const Ratio_1 = require("../../Ratio");
const ArrayUtil_1 = require("../../ArrayUtil");
const rgbInterpolatedColorOfTwoColors_1 = require("./rgbInterpolatedColorOfTwoColors");
function rgbInterpolatedColorOfColors(colors, ratio) {
    const decimalRatioPerStep = 1 / (colors.length - 1);
    if (ratio.toDecimal() === 1) {
        return ArrayUtil_1.ArrayUtil.optionalLastItemGivenArray(colors);
    }
    const lowerBoundIdx = Math.floor(ratio.toDecimal() * (colors.length - 1));
    const upperBoundIdx = Math.ceil(ratio.toDecimal() * (colors.length - 1));
    const lowerColor = colors[lowerBoundIdx];
    const upperColor = colors[upperBoundIdx];
    const partRatio = Ratio_1.Ratio.givenDecimal((ratio.toDecimal() - lowerBoundIdx * decimalRatioPerStep) /
        decimalRatioPerStep);
    return rgbInterpolatedColorOfTwoColors_1.rgbInterpolatedColorOfTwoColors(lowerColor, upperColor, partRatio);
}
exports.rgbInterpolatedColorOfColors = rgbInterpolatedColorOfColors;
//# sourceMappingURL=rgbInterpolatedColorOfColors.js.map