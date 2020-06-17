"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.xyzGivenRgbFloat = void 0;
function xyzGivenRgbFloat(rgbFloatColor) {
    let r = rgbFloatColor.r.toDecimal();
    let g = rgbFloatColor.g.toDecimal();
    let b = rgbFloatColor.b.toDecimal();
    if (r > 0.04045) {
        r = Math.pow((r + 0.055) / 1.055, 2.4);
    }
    else {
        r = r / 12.92;
    }
    if (g > 0.04045) {
        g = Math.pow((g + 0.055) / 1.055, 2.4);
    }
    else {
        g = g / 12.92;
    }
    if (b > 0.04045) {
        b = Math.pow((b + 0.055) / 1.055, 2.4);
    }
    else {
        b = b / 12.92;
    }
    r = r * 100;
    g = g * 100;
    b = b * 100;
    return {
        x: r * 0.4124 + g * 0.3576 + b * 0.1805,
        y: r * 0.2126 + g * 0.7152 + b * 0.0722,
        z: r * 0.0193 + g * 0.1192 + b * 0.9505,
    };
}
exports.xyzGivenRgbFloat = xyzGivenRgbFloat;
//# sourceMappingURL=xyzGivenRgbFloat.js.map