import { RgbFloatColor } from "..";
import { Ratio } from "../../Ratio";

export function rgbStringGivenRgbFloat(
  rgbColor: RgbFloatColor,
  alpha: Ratio
): string {
  const r = Math.round(rgbColor.r.toDecimal() * 255);
  const g = Math.round(rgbColor.g.toDecimal() * 255);
  const b = Math.round(rgbColor.b.toDecimal() * 255);
  const a = alpha.toDecimal();

  if (a === 1) {
    return `rgb(${r}, ${g}, ${b})`;
  } else {
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }
}
