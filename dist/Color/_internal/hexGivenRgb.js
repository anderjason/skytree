"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hexGivenRgb = void 0;
function hexGivenRgb(rgbColor, alpha) {
    const hexR = Math.round(rgbColor.r.toDecimal() * 255)
        .toString(16)
        .padStart(2, "0");
    const hexG = Math.round(rgbColor.g.toDecimal() * 255)
        .toString(16)
        .padStart(2, "0");
    const hexB = Math.round(rgbColor.b.toDecimal() * 255)
        .toString(16)
        .padStart(2, "0");
    if (alpha.toDecimal() === 1) {
        return `#${hexR}${hexG}${hexB}`;
    }
    else {
        const hexA = Math.round(alpha.toDecimal() * 255)
            .toString(16)
            .padStart(2, "0");
        return `#${hexR}${hexG}${hexB}${hexA}`;
    }
}
exports.hexGivenRgb = hexGivenRgb;
//# sourceMappingURL=hexGivenRgb.js.map