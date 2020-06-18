import { hsbGivenRgbFloat } from "./_internal/hsbGivenRgbFloat";
import { hslGivenRgbFloat } from "./_internal/hslGivenRgbFloat";
import { labGivenHcl } from "./_internal/labGivenHcl";
import { labGivenXyz } from "./_internal/labGivenXyz";
import { hclGivenLab } from "./_internal/hclGivenLab";
import { rgbFloatGivenHsl } from "./_internal/rgbFloatGivenHsl";
import { rgbFloatGivenXyz } from "./_internal/rgbFloatGivenXyz";
import { hsbStringGivenHsb } from "./_internal/hsbStringGivenHsb";
import { hslStringGivenHsl } from "./_internal/hslStringGivenHsl";
import { rgbStringGivenRgbFloat } from "./_internal/rgbStringGivenRgbFloat";
import { xyzGivenLab } from "./_internal/xyzGivenLab";
import { xyzGivenRgbFloat } from "./_internal/xyzGivenRgbFloat";
import { rgbFloatGivenHex } from "./_internal/rgbFloatGivenHex";
import { Ratio } from "../Ratio";
import { hexGivenRgb } from "./_internal/hexGivenRgb";
import { highContrastColorGivenColor } from "./_internal/highContrastColorGivenColor";
import { numberWithHardLimit } from "../NumberUtil/numberWithHardLimit";
import { distanceGivenColors } from "./_internal/distanceGivenColors";
import { numberWithRangeMap } from "../NumberUtil/numberWithRangeMap";
import { NumberUtil } from "../NumberUtil";

export interface HsbColor {
  h: number;
  s: number;
  b: number;
}

export interface HslColor {
  h: Ratio; // maybe hue has a different range than 0-1?
  s: Ratio;
  l: Ratio;
}

export interface LabColor {
  l: number;
  a: number;
  b: number;
}

export interface HclColor {
  h: Ratio; // maybe hue has a different range than 0-1?
  c: Ratio;
  l: Ratio;
}

export interface RgbFloatColor {
  r: Ratio;
  g: Ratio;
  b: Ratio;
}

export interface XyzColor {
  x: number;
  y: number;
  z: number;
}

export class Color {
  private _labColor: LabColor;
  private _alpha: Ratio;
  private _hexString: string | undefined;

  static isEqual(a: Color, b: Color): boolean {
    if (a == null && b == null) {
      return true;
    }

    if (a == null || b == null) {
      return false;
    }

    return a.isEqual(b);
  }

  static givenHslFloat(
    hslColor: HslColor,
    alpha: Ratio = Ratio.givenDecimal(1)
  ): Color {
    return Color.givenRgbFloat(rgbFloatGivenHsl(hslColor), alpha);
  }

  static givenHex(hexColor: string): Color {
    return Color.givenRgbFloat(rgbFloatGivenHex(hexColor));
  }

  static givenHclFloat(
    hclColor: HclColor,
    alpha: Ratio = Ratio.givenDecimal(1)
  ): Color {
    return new Color(labGivenHcl(hclColor), alpha);
  }

  static givenRgbFloat(
    rgbColor: RgbFloatColor,
    alpha: Ratio = Ratio.givenDecimal(1)
  ): Color {
    const labColor = labGivenXyz(xyzGivenRgbFloat(rgbColor));
    return new Color(labColor, alpha);
  }

  static givenRgb255(r: number, g: number, b: number, a?: Ratio): Color {
    return Color.givenRgbFloat(
      {
        r: Ratio.givenDecimal(numberWithRangeMap(r, 0, 255, 0, 1)),
        g: Ratio.givenDecimal(numberWithRangeMap(g, 0, 255, 0, 1)),
        b: Ratio.givenDecimal(numberWithRangeMap(b, 0, 255, 0, 1)),
      },
      a
    );
  }

  static givenColorNumber(intColor: number, alpha: number = 1): Color {
    let alphaString;

    if (alpha === 1) {
      alphaString = "";
    } else {
      alphaString = Math.round(
        NumberUtil.numberWithHardLimit(alpha, 0, 1) * 255
      )
        .toString(16)
        .padStart(2, "0");
    }

    const hex = `#${intColor.toString(16).padStart(6, "0")}${alphaString}`;
    return Color.givenHex(hex);
  }

  private constructor(labColor: LabColor, alpha: Ratio) {
    this._labColor = labColor;
    this._alpha = alpha;
  }

  isEqual(otherColor: Color): boolean {
    if (otherColor == null) {
      return false;
    }

    return (
      this._labColor.a === otherColor._labColor.a &&
      this._labColor.b === otherColor._labColor.b &&
      this._labColor.l === otherColor._labColor.l
    );
  }

  withLightness(absoluteLightness: number): Color {
    const { a, b } = this._labColor;

    return new Color(
      {
        l: absoluteLightness * 100,
        a,
        b,
      },
      this._alpha
    );
  }

  withRelativeLightness(relativeLightness: number): Color {
    const { l } = this._labColor;

    return this.withLightness(l / 100 + relativeLightness);
  }

  withHue(absoluteHue: Ratio): Color {
    const { s, l } = hslGivenRgbFloat(this.toRgbFloatColor());

    return new Color(
      labGivenXyz(
        xyzGivenRgbFloat(
          rgbFloatGivenHsl({
            h: absoluteHue,
            s,
            l,
          })
        )
      ),
      this._alpha
    );
  }

  withRelativeHue(relativeHue: Ratio): Color {
    const { h } = hslGivenRgbFloat(this.toRgbFloatColor());

    let absoluteHue: number = h.toDecimal() + relativeHue.toDecimal();

    if (absoluteHue > 1) {
      absoluteHue -= 1;
    }
    if (absoluteHue < 0) {
      absoluteHue += 1;
    }

    return this.withHue(Ratio.givenDecimal(absoluteHue));
  }

  withSaturation(absoluteSaturation: Ratio): Color {
    let { l, h } = hclGivenLab(this._labColor);

    return new Color(labGivenHcl({ h, c: absoluteSaturation, l }), this._alpha);
  }

  withRelativeSaturation(relativeSaturation: Ratio): Color {
    const hcl = hclGivenLab(this._labColor);
    let c = hcl.c.toDecimal();

    c = numberWithHardLimit(c + relativeSaturation.toDecimal(), 0, 1);

    return this.withSaturation(Ratio.givenDecimal(c));
  }

  withAlpha(absoluteAlpha: Ratio): Color {
    return new Color(this._labColor, absoluteAlpha);
  }

  withRelativeAlpha(relativeAlpha: Ratio): Color {
    return this.withAlpha(this._alpha.withAddedRatio(relativeAlpha));
  }

  toDistanceGivenColor(otherColor: Color): number {
    return distanceGivenColors(this, otherColor);
  }

  toString(): string {
    return this.toRgbString();
  }

  toHexString(): string {
    if (this._hexString == null) {
      this._hexString = hexGivenRgb(this.toRgbFloatColor(), this._alpha);
    }

    return this._hexString;
  }

  toLabColor(): LabColor {
    return {
      l: this._labColor.l,
      a: this._labColor.a,
      b: this._labColor.b,
    };
  }

  toRgbFloatColor(): RgbFloatColor {
    return rgbFloatGivenXyz(xyzGivenLab(this._labColor));
  }

  toRgbString(): string {
    return rgbStringGivenRgbFloat(this.toRgbFloatColor(), this._alpha);
  }

  toHslColor(): HslColor {
    return hslGivenRgbFloat(this.toRgbFloatColor());
  }

  toHslString(): string {
    return hslStringGivenHsl(this.toHslColor());
  }

  toHsbColor(): HsbColor {
    return hsbGivenRgbFloat(this.toRgbFloatColor());
  }

  toHsbString(): string {
    return hsbStringGivenHsb(this.toHsbColor());
  }

  toHclColor(): HclColor {
    return hclGivenLab(this._labColor);
  }

  toHighContrastColor(): Color {
    return highContrastColorGivenColor(this);
  }

  toColorNumber(): number {
    return parseInt(this.toHexString().slice(1, 7), 16);
  }
}
