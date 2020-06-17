"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rgbFloatGivenXyz = void 0;
const numberWithHardLimit_1 = require("../../NumberUtil/numberWithHardLimit");
const Ratio_1 = require("../../Ratio");
function rgbFloatGivenXyz(xyzColor) {
    const x = xyzColor.x / 100;
    const y = xyzColor.y / 100;
    const z = xyzColor.z / 100;
    let r = x * 3.2406 + y * -1.5372 + z * -0.4986;
    let g = x * -0.9689 + y * 1.8758 + z * 0.0415;
    let b = x * 0.0557 + y * -0.204 + z * 1.057;
    if (r > 0.0031308) {
        r = 1.055 * Math.pow(r, 1 / 2.4) - 0.055;
    }
    else {
        r = 12.92 * r;
    }
    if (g > 0.0031308) {
        g = 1.055 * Math.pow(g, 1 / 2.4) - 0.055;
    }
    else {
        g = 12.92 * g;
    }
    if (b > 0.0031308) {
        b = 1.055 * Math.pow(b, 1 / 2.4) - 0.055;
    }
    else {
        b = 12.92 * b;
    }
    return {
        r: Ratio_1.Ratio.givenDecimal(numberWithHardLimit_1.numberWithHardLimit(r, 0, 1)),
        g: Ratio_1.Ratio.givenDecimal(numberWithHardLimit_1.numberWithHardLimit(g, 0, 1)),
        b: Ratio_1.Ratio.givenDecimal(numberWithHardLimit_1.numberWithHardLimit(b, 0, 1)),
    };
}
exports.rgbFloatGivenXyz = rgbFloatGivenXyz;
//# sourceMappingURL=rgbFloatGivenXyz.js.map