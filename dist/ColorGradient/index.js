"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColorGradient = void 0;
const hclInterpolatedColorOfColors_1 = require("./_internal/hclInterpolatedColorOfColors");
const rgbInterpolatedColorOfColors_1 = require("./_internal/rgbInterpolatedColorOfColors");
const hclStepsOfColorGradient_1 = require("./_internal/hclStepsOfColorGradient");
const rgbStepsOfColorGradient_1 = require("./_internal/rgbStepsOfColorGradient");
class ColorGradient {
    constructor(steps) {
        this._steps = steps;
    }
    static givenSteps(steps) {
        if (steps.length < 2) {
            throw new Error("At least 2 steps are required");
        }
        return new ColorGradient(steps);
    }
    toSteps() {
        return this._steps;
    }
    toLinearGradientString(direction) {
        const colors = this._steps.map((s) => s.toString());
        return `linear-gradient(${direction}, ${colors.join(",")})`;
    }
    toHclInterpolatedColor(ratio) {
        return hclInterpolatedColorOfColors_1.hclInterpolatedColorOfColors(this._steps, ratio);
    }
    toRgbInterpolatedColor(ratio) {
        return rgbInterpolatedColorOfColors_1.rgbInterpolatedColorOfColors(this._steps, ratio);
    }
    withHclStepCount(stepCount) {
        return new ColorGradient(hclStepsOfColorGradient_1.hclStepsOfColorGradient(this, stepCount));
    }
    withRgbStepCount(stepCount) {
        return new ColorGradient(rgbStepsOfColorGradient_1.rgbStepsOfColorGradient(this, stepCount));
    }
}
exports.ColorGradient = ColorGradient;
//# sourceMappingURL=index.js.map