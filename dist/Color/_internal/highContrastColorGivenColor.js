"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.highContrastColorGivenColor = void 0;
const __1 = require("..");
const Ratio_1 = require("../../Ratio");
function highContrastColorGivenColor(input) {
    const hclColor = input.toHclColor();
    let v;
    if (hclColor.l.toDecimal() > 0.5) {
        v = Ratio_1.Ratio.givenDecimal(0);
    }
    else {
        v = Ratio_1.Ratio.givenDecimal(1);
    }
    return __1.Color.givenRgbFloat({ r: v, g: v, b: v });
}
exports.highContrastColorGivenColor = highContrastColorGivenColor;
//# sourceMappingURL=highContrastColorGivenColor.js.map