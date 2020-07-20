"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hclInterpolatedColorOfColors = void 0;
const hclInterpolatedColorOfTwoColors_1 = require("./hclInterpolatedColorOfTwoColors");
const Ratio_1 = require("../../Ratio");
const ArrayUtil_1 = require("../../ArrayUtil");
function hclInterpolatedColorOfColors(colors, ratio) {
    const decimalRatioPerStep = 1 / (colors.length - 1);
    if (ratio.toDecimal() === 1) {
        return ArrayUtil_1.ArrayUtil.optionalLastValueGivenArray(colors);
    }
    const lowerBoundIdx = Math.floor(ratio.toDecimal() * (colors.length - 1));
    const upperBoundIdx = Math.ceil(ratio.toDecimal() * (colors.length - 1));
    const lowerColor = colors[lowerBoundIdx];
    const upperColor = colors[upperBoundIdx];
    const partRatio = Ratio_1.Ratio.givenDecimal((ratio.toDecimal() - lowerBoundIdx * decimalRatioPerStep) /
        decimalRatioPerStep);
    return hclInterpolatedColorOfTwoColors_1.hclInterpolatedColorOfTwoColors(lowerColor, upperColor, partRatio);
}
exports.hclInterpolatedColorOfColors = hclInterpolatedColorOfColors;
//# sourceMappingURL=hclInterpolatedColorOfColors.js.map