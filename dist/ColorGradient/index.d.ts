import { Color } from "../Color";
import { Ratio } from "../Ratio";
export declare class ColorGradient {
    private _steps;
    static givenSteps(steps: Color[]): ColorGradient;
    private constructor();
    toSteps(): Color[];
    toLinearGradientString(direction: string): string;
    toHclInterpolatedColor(ratio: Ratio): Color;
    toRgbInterpolatedColor(ratio: Ratio): Color;
    withHclStepCount(stepCount: number): ColorGradient;
    withRgbStepCount(stepCount: number): ColorGradient;
}
