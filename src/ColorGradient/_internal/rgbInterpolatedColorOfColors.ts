import { Ratio } from "../../Ratio";
import { ArrayUtil } from "../../ArrayUtil";
import { Color } from "../../Color";
import { rgbInterpolatedColorOfTwoColors } from "./rgbInterpolatedColorOfTwoColors";

export function rgbInterpolatedColorOfColors(
  colors: Color[],
  ratio: Ratio
): Color {
  const decimalRatioPerStep: number = 1 / (colors.length - 1);

  if (ratio.toDecimal() === 1) {
    return ArrayUtil.optionalLastItemGivenArray(colors)!;
  }

  const lowerBoundIdx = Math.floor(ratio.toDecimal() * (colors.length - 1));
  const upperBoundIdx = Math.ceil(ratio.toDecimal() * (colors.length - 1));

  const lowerColor = colors[lowerBoundIdx];
  const upperColor = colors[upperBoundIdx];

  const partRatio = Ratio.givenDecimal(
    (ratio.toDecimal() - lowerBoundIdx * decimalRatioPerStep) /
      decimalRatioPerStep
  );

  return rgbInterpolatedColorOfTwoColors(lowerColor, upperColor, partRatio);
}
