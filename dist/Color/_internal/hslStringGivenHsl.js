"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function hslStringGivenHsl(hslColor) {
    const h = Math.round(hslColor.h.toDecimal() * 359);
    const s = Math.round(hslColor.s.toDecimal() * 100);
    const l = Math.round(hslColor.l.toDecimal() * 100);
    return `hsl(${h}, ${s}%, ${l}%)`;
}
exports.hslStringGivenHsl = hslStringGivenHsl;
//# sourceMappingURL=hslStringGivenHsl.js.map