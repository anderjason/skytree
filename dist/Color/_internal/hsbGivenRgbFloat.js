"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hsbGivenRgbFloat = void 0;
const __1 = require("../..");
function hsbGivenRgbFloat(rgbFloatColor) {
    const r = rgbFloatColor.r.toDecimal();
    const g = rgbFloatColor.g.toDecimal();
    const b = rgbFloatColor.b.toDecimal();
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const delta = max - min;
    let h = 0;
    if (delta != 0) {
        if (r == max) {
            h = (g - b) / delta;
        }
        else {
            if (g == max) {
                h = 2 + (b - r) / delta;
            }
            else {
                h = 4 + (r - g) / delta;
            }
        }
        h *= 60;
        if (h < 0) {
            h += 360;
        }
    }
    return {
        h: __1.Ratio.givenDecimal(h / 360),
        s: __1.Ratio.givenDecimal(max == 0 ? 0 : (max - min) / max),
        b: __1.Ratio.givenDecimal(max),
    };
}
exports.hsbGivenRgbFloat = hsbGivenRgbFloat;
//# sourceMappingURL=hsbGivenRgbFloat.js.map