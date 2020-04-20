import { Color, HclColor } from "..";
import { Ratio } from "../../Ratio";

export function highContrastColorGivenColor(input: Color): Color {
  const hclColor: HclColor = input.toHclColor();

  let v: Ratio;
  if (hclColor.l.toDecimal() > 0.5) {
    v = Ratio.ofDecimal(0);
  } else {
    v = Ratio.ofDecimal(1);
  }

  return Color.ofRgbFloat({ r: v, g: v, b: v });
}
