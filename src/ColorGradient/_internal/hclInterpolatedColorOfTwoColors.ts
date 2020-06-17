import { Color, HclColor } from "../../Color";
import { Ratio } from "../../Ratio";

export function hclInterpolatedColorOfTwoColors(
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

  const hcl1: HclColor = color1.toHclColor();
  const hcl2: HclColor = color2.toHclColor();

  const h1 = hcl1.h.toDecimal();
  const c1 = hcl1.c.toDecimal();
  const l1 = hcl1.l.toDecimal();

  const h2 = hcl2.h.toDecimal();
  const c2 = hcl2.c.toDecimal();
  const l2 = hcl2.l.toDecimal();

  let deltaH;

  if (h2 > h1 && h2 - h1 > 0.5) {
    deltaH = h2 - (h1 + 1);
  } else if (h2 < h1 && h1 - h2 > 0.5) {
    deltaH = h2 + 1 - h1;
  } else {
    deltaH = h2 - h1;
  }

  return Color.givenHclFloat({
    h: Ratio.givenDecimal(h1 + ratio.toDecimal() * deltaH),
    c: Ratio.givenDecimal(c1 + ratio.toDecimal() * (c2 - c1)),
    l: Ratio.givenDecimal(l1 + ratio.toDecimal() * (l2 - l1)),
  });
}
