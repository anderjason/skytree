"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hslGivenRgbFloat = void 0;
const Ratio_1 = require("../../Ratio");
function hslGivenRgbFloat(rgbColor) {
    const r = rgbColor.r.toDecimal();
    const g = rgbColor.g.toDecimal();
    const b = rgbColor.b.toDecimal();
    let min = Math.min(r, g, b); //Min. value of RGB
    let max = Math.max(r, g, b); //Max. value of RGB
    let delMax = max - min; //Delta RGB value
    let delR;
    let delG;
    let delB;
    let h = 0;
    let s = 0;
    let l = (max + min) / 2;
    if (delMax == 0) {
        h = 0;
        s = 0;
    }
    else {
        if (l < 0.5) {
            s = delMax / (max + min);
        }
        else {
            s = delMax / (2 - max - min);
        }
        delR = ((max - r) / 6 + delMax / 2) / delMax;
        delG = ((max - g) / 6 + delMax / 2) / delMax;
        delB = ((max - b) / 6 + delMax / 2) / delMax;
        if (r == max) {
            h = delB - delG;
        }
        else if (g == max) {
            h = 1 / 3 + delR - delB;
        }
        else if (b == max) {
            h = 2 / 3 + delG - delR;
        }
        if (h < 0) {
            h += 1;
        }
        if (h > 1) {
            h -= 1;
        }
    }
    return {
        h: Ratio_1.Ratio.givenDecimal(h),
        s: Ratio_1.Ratio.givenDecimal(s),
        l: Ratio_1.Ratio.givenDecimal(l),
    };
}
exports.hslGivenRgbFloat = hslGivenRgbFloat;
//# sourceMappingURL=hslGivenRgbFloat.js.map