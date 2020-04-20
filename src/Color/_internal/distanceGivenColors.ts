import { Color } from "..";

export function distanceGivenColors(colorA: Color, colorB: Color) {
  const labA = colorA.toLabColor();
  const labB = colorB.toLabColor();

  const deltaL = Math.abs(labA.l - labB.l);
  const deltaA = Math.abs(labA.a - labB.a);
  const deltaB = Math.abs(labA.b - labB.b);

  return deltaL + deltaA + deltaB;
}
