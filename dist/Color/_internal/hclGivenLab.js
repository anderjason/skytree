"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Ratio_1 = require("../../Ratio");
const RAD2DEG = 180 / Math.PI;
function hclGivenLab(labColor) {
    const { l, a, b } = labColor;
    const c = Math.sqrt(a * a + b * b);
    let h = (Math.atan2(b, a) * RAD2DEG + 360) % 360;
    if (Math.round(c * 10000) === 0) {
        h = Number.NaN;
    }
    return {
        h: Ratio_1.Ratio.ofDecimal(h / 360),
        c: Ratio_1.Ratio.ofDecimal(c / 140),
        l: Ratio_1.Ratio.ofDecimal(l / 100),
    };
}
exports.hclGivenLab = hclGivenLab;
//# sourceMappingURL=hclGivenLab.js.map