"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Ratio_1 = require("../../Ratio");
const hexRegex = /^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
function rgbFloatGivenHex(hexColor) {
    if (!hexColor.match(hexRegex)) {
        throw new Error(`Unrecognized hex color: ${hexColor}`);
    }
    // remove optional leading #
    if (hexColor.length === 4 || hexColor.length === 7) {
        hexColor = hexColor.substr(1);
    }
    // expand short-notation to full six-digit
    if (hexColor.length === 3) {
        const parts = hexColor.split("");
        hexColor = parts[0] + parts[0] + parts[1] + parts[1] + parts[2] + parts[2];
    }
    const u = parseInt(hexColor, 16);
    const r = u >> 16;
    const g = (u >> 8) & 0xff;
    const b = u & 0xff;
    return {
        r: Ratio_1.Ratio.ofDecimal(r / 255),
        g: Ratio_1.Ratio.ofDecimal(g / 255),
        b: Ratio_1.Ratio.ofDecimal(b / 255),
    };
}
exports.rgbFloatGivenHex = rgbFloatGivenHex;
//# sourceMappingURL=rgbFloatGivenHex.js.map