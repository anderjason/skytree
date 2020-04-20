"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function hsbStringGivenHsb(hsbColor) {
    const h = Math.round(hsbColor.h * 359);
    const s = Math.round(hsbColor.s * 100);
    const b = Math.round(hsbColor.b * 100);
    return `hsb(${h}, ${s}%, ${b}%)`;
}
exports.hsbStringGivenHsb = hsbStringGivenHsb;
//# sourceMappingURL=hsbStringGivenHsb.js.map