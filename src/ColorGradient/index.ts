import { Color } from "../Color";
import { Ratio } from "../Ratio";
import { hclInterpolatedColorOfColors } from "./_internal/hclInterpolatedColorOfColors";
import { rgbInterpolatedColorOfColors } from "./_internal/rgbInterpolatedColorOfColors";
import { hclStepsOfColorGradient } from "./_internal/hclStepsOfColorGradient";
import { rgbStepsOfColorGradient } from "./_internal/rgbStepsOfColorGradient";

export class ColorGradient {
  private _steps: Color[];

  static givenSteps(steps: Color[]): ColorGradient {
    if (steps.length < 2) {
      throw new Error("At least 2 steps are required");
    }

    return new ColorGradient(steps);
  }

  private constructor(steps: Color[]) {
    this._steps = steps;
  }

  toSteps(): Color[] {
    return this._steps;
  }

  toLinearGradientString(direction: string): string {
    const colors: string[] = this._steps.map((s) => s.toString());

    return `linear-gradient(${direction}, ${colors.join(",")})`;
  }

  toHclInterpolatedColor(ratio: Ratio): Color {
    return hclInterpolatedColorOfColors(this._steps, ratio);
  }

  toRgbInterpolatedColor(ratio: Ratio): Color {
    return rgbInterpolatedColorOfColors(this._steps, ratio);
  }

  withHclStepCount(stepCount: number): ColorGradient {
    return new ColorGradient(hclStepsOfColorGradient(this, stepCount));
  }

  withRgbStepCount(stepCount: number): ColorGradient {
    return new ColorGradient(rgbStepsOfColorGradient(this, stepCount));
  }
}
