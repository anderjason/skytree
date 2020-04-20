import { HsbColor } from "..";

export function hsbStringGivenHsb(hsbColor: HsbColor): string {
  const h = Math.round(hsbColor.h * 359);
  const s = Math.round(hsbColor.s * 100);
  const b = Math.round(hsbColor.b * 100);

  return `hsb(${h}, ${s}%, ${b}%)`;
}
