import { HsbColor } from "..";

export function hsbStringGivenHsb(hsbColor: HsbColor): string {
  const h = Math.round(hsbColor.h.toDecimal() * 359);
  const s = Math.round(hsbColor.s.toDecimal() * 100);
  const b = Math.round(hsbColor.b.toDecimal() * 100);

  return `hsb(${h}, ${s}%, ${b}%)`;
}
