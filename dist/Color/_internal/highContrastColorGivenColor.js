"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const Ratio_1 = require("../../Ratio");
function highContrastColorGivenColor(input) {
    const hclColor = input.toHclColor();
    let v;
    if (hclColor.l.toDecimal() > 0.5) {
        v = Ratio_1.Ratio.ofDecimal(0);
    }
    else {
        v = Ratio_1.Ratio.ofDecimal(1);
    }
    return __1.Color.ofRgbFloat({ r: v, g: v, b: v });
}
exports.highContrastColorGivenColor = highContrastColorGivenColor;
//# sourceMappingURL=highContrastColorGivenColor.js.map