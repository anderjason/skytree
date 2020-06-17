/**
 * @author Jason Anderson <jason@gearsandwires.com>
 * @copyright 2016-2019 Gears & Wires
 * @license See vendor/wireframe/LICENSE file
 */

import { Color } from "../../Color";
import { ColorGradient } from "..";
import { Ratio } from "../../Ratio";
import { ArrayUtil } from "../../ArrayUtil";

export function hclStepsOfColorGradient(
  colorGradient: ColorGradient,
  totalSteps: number
): Color[] {
  if (totalSteps < 2) {
    throw new Error("At least two total steps are required");
  }

  return ArrayUtil.numberArrayGivenRange(0, totalSteps - 1).map((n) =>
    colorGradient.toHclInterpolatedColor(Ratio.givenFraction(n, totalSteps - 1))
  );
}
