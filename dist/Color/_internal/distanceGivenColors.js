"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function distanceGivenColors(colorA, colorB) {
    const labA = colorA.toLabColor();
    const labB = colorB.toLabColor();
    const deltaL = Math.abs(labA.l - labB.l);
    const deltaA = Math.abs(labA.a - labB.a);
    const deltaB = Math.abs(labA.b - labB.b);
    return deltaL + deltaA + deltaB;
}
exports.distanceGivenColors = distanceGivenColors;
//# sourceMappingURL=distanceGivenColors.js.map