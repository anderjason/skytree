import { HslColor } from "..";

export function hslStringGivenHsl(hslColor: HslColor): string {
  const h = Math.round(hslColor.h.toDecimal() * 359);
  const s = Math.round(hslColor.s.toDecimal() * 100);
  const l = Math.round(hslColor.l.toDecimal() * 100);

  return `hsl(${h}, ${s}%, ${l}%)`;
}
