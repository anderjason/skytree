import { Color, RgbFloatColor } from "../../Color";
import { Ratio } from "../../Ratio";

export function rgbInterpolatedColorOfTwoColors(
  color1: Color,
  color2: Color,
  ratio: Ratio
): Color {
  if (color1 == null) {
    throw new Error("Color 1 is required");
  }

  if (color2 == null) {
    throw new Error("Color 2 is required");
  }

  if (ratio.toDecimal() === 0) {
    return color1;
  }

  if (ratio.toDecimal() === 1) {
    return color2;
  }

  const rgb1: RgbFloatColor = color1.toRgbFloatColor();
  const rgb2: RgbFloatColor = color2.toRgbFloatColor();

  const r1 = rgb1.r.toDecimal();
  const g1 = rgb1.g.toDecimal();
  const b1 = rgb1.b.toDecimal();

  const r2 = rgb2.r.toDecimal();
  const g2 = rgb2.g.toDecimal();
  const b2 = rgb2.b.toDecimal();

  return Color.givenRgbFloat({
    r: Ratio.givenDecimal(r1 + ratio.toDecimal() * (r2 - r1)),
    g: Ratio.givenDecimal(g1 + ratio.toDecimal() * (g2 - g1)),
    b: Ratio.givenDecimal(b1 + ratio.toDecimal() * (b2 - b1)),
  });
}
