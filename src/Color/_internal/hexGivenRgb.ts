import { RgbFloatColor } from "..";
import { Ratio } from "../../Ratio";

export function hexGivenRgb(rgbColor: RgbFloatColor, alpha: Ratio): string {
  const hexR: string = Math.round(rgbColor.r.toDecimal() * 255)
    .toString(16)
    .padStart(2, "0");

  const hexG: string = Math.round(rgbColor.g.toDecimal() * 255)
    .toString(16)
    .padStart(2, "0");

  const hexB: string = Math.round(rgbColor.b.toDecimal() * 255)
    .toString(16)
    .padStart(2, "0");

  if (alpha.toDecimal() === 1) {
    return `#${hexR}${hexG}${hexB}`;
  } else {
    const hexA = Math.round(alpha.toDecimal() * 255)
      .toString(16)
      .padStart(2, "0");
    return `#${hexR}${hexG}${hexB}${hexA}`;
  }
}
