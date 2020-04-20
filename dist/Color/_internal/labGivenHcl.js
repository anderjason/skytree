"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DEG2RAD = Math.PI / 180;
function labGivenHcl(hclColor) {
    let h = hclColor.h.toDecimal() * 360;
    let c = hclColor.c.toDecimal() * 140;
    let l = hclColor.l.toDecimal() * 100;
    h = h * DEG2RAD;
    return {
        l,
        a: Math.cos(h) * c,
        b: Math.sin(h) * c,
    };
}
exports.labGivenHcl = labGivenHcl;
//# sourceMappingURL=labGivenHcl.js.map