"use strict";
/**
 * @author Jason Anderson <jason@gearsandwires.com>
 * @copyright 2016-2019 Gears & Wires
 * @license See vendor/wireframe/LICENSE file
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.hclStepsOfColorGradient = void 0;
const Ratio_1 = require("../../Ratio");
const ArrayUtil_1 = require("../../ArrayUtil");
function hclStepsOfColorGradient(colorGradient, totalSteps) {
    if (totalSteps < 2) {
        throw new Error("At least two total steps are required");
    }
    return ArrayUtil_1.ArrayUtil.numberArrayGivenRange(0, totalSteps - 1).map((n) => colorGradient.toHclInterpolatedColor(Ratio_1.Ratio.givenFraction(n, totalSteps - 1)));
}
exports.hclStepsOfColorGradient = hclStepsOfColorGradient;
//# sourceMappingURL=hclStepsOfColorGradient.js.map