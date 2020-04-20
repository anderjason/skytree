"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function labGivenXyz(xyzColor) {
    let x = xyzColor.x / 95.047;
    let y = xyzColor.y / 100.0;
    let z = xyzColor.z / 108.883;
    if (x > 0.008856) {
        x = Math.pow(x, 1 / 3);
    }
    else {
        x = 7.787 * x + 16 / 116;
    }
    if (y > 0.008856) {
        y = Math.pow(y, 1 / 3);
    }
    else {
        y = 7.787 * y + 16 / 116;
    }
    if (z > 0.008856) {
        z = Math.pow(z, 1 / 3);
    }
    else {
        z = 7.787 * z + 16 / 116;
    }
    return {
        l: 116 * y - 16,
        a: 500 * (x - y),
        b: 200 * (y - z)
    };
}
exports.labGivenXyz = labGivenXyz;
//# sourceMappingURL=labGivenXyz.js.map