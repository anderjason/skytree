"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rgbInterpolatedColorOfTwoColors = void 0;
const Color_1 = require("../../Color");
const Ratio_1 = require("../../Ratio");
function rgbInterpolatedColorOfTwoColors(color1, color2, ratio) {
    if (color1 == null) {
        throw new Error("Color 1 is required");
    }
    if (color2 == null) {
        throw new Error("Color 2 is required");
    }
    if (ratio.toDecimal() === 0) {
        return color1;
    }
    if (ratio.toDecimal() === 1) {
        return color2;
    }
    const rgb1 = color1.toRgbFloatColor();
    const rgb2 = color2.toRgbFloatColor();
    const r1 = rgb1.r.toDecimal();
    const g1 = rgb1.g.toDecimal();
    const b1 = rgb1.b.toDecimal();
    const r2 = rgb2.r.toDecimal();
    const g2 = rgb2.g.toDecimal();
    const b2 = rgb2.b.toDecimal();
    return Color_1.Color.givenRgbFloat({
        r: Ratio_1.Ratio.givenDecimal(r1 + ratio.toDecimal() * (r2 - r1)),
        g: Ratio_1.Ratio.givenDecimal(g1 + ratio.toDecimal() * (g2 - g1)),
        b: Ratio_1.Ratio.givenDecimal(b1 + ratio.toDecimal() * (b2 - b1)),
    });
}
exports.rgbInterpolatedColorOfTwoColors = rgbInterpolatedColorOfTwoColors;
//# sourceMappingURL=rgbInterpolatedColorOfTwoColors.js.map