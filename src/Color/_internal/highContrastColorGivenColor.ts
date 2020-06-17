import { Color, HclColor } from "..";
import { Ratio } from "../../Ratio";

export function highContrastColorGivenColor(input: Color): Color {
  const hclColor: HclColor = input.toHclColor();

  let v: Ratio;
  if (hclColor.l.toDecimal() > 0.5) {
    v = Ratio.givenDecimal(0);
  } else {
    v = Ratio.givenDecimal(1);
  }

  return Color.givenRgbFloat({ r: v, g: v, b: v });
}
