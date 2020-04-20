import { RgbFloatColor, HslColor } from "..";
import { Ratio } from "../../Ratio";

export function hslGivenRgbFloat(rgbColor: RgbFloatColor): HslColor {
  const r = rgbColor.r.toDecimal();
  const g = rgbColor.g.toDecimal();
  const b = rgbColor.b.toDecimal();

  let min = Math.min(r, g, b); //Min. value of RGB
  let max = Math.max(r, g, b); //Max. value of RGB
  let delMax = max - min; //Delta RGB value
  let delR: number;
  let delG: number;
  let delB: number;
  let h: number = 0;
  let s: number = 0;
  let l = (max + min) / 2;

  if (delMax == 0) {
    h = 0;
    s = 0;
  } else {
    if (l < 0.5) {
      s = delMax / (max + min);
    } else {
      s = delMax / (2 - max - min);
    }

    delR = ((max - r) / 6 + delMax / 2) / delMax;
    delG = ((max - g) / 6 + delMax / 2) / delMax;
    delB = ((max - b) / 6 + delMax / 2) / delMax;

    if (r == max) {
      h = delB - delG;
    } else if (g == max) {
      h = 1 / 3 + delR - delB;
    } else if (b == max) {
      h = 2 / 3 + delG - delR;
    }

    if (h < 0) {
      h += 1;
    }
    if (h > 1) {
      h -= 1;
    }
  }

  return {
    h: Ratio.ofDecimal(h),
    s: Ratio.ofDecimal(s),
    l: Ratio.ofDecimal(l),
  };
}
