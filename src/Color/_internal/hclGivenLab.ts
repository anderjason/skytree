import { LabColor, HclColor } from "..";
import { Ratio } from "../../Ratio";

const RAD2DEG = 180 / Math.PI;

export function hclGivenLab(labColor: LabColor): HclColor {
  const { l, a, b } = labColor;

  const c = Math.sqrt(a * a + b * b);
  let h = (Math.atan2(b, a) * RAD2DEG + 360) % 360;
  if (Math.round(c * 10000) === 0) {
    h = Number.NaN;
  }

  return {
    h: Ratio.givenDecimal(h / 360),
    c: Ratio.givenDecimal(c / 140),
    l: Ratio.givenDecimal(l / 100),
  };
}
