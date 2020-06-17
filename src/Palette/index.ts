import { Color } from "../Color";
import { ArrayUtil } from "../ArrayUtil";

export class Palette {
  private _colors: Color[];

  static givenColors(colors: Color[]): Palette {
    return new Palette(colors);
  }

  private constructor(colors: Color[]) {
    this._colors = colors;
  }

  get colors(): Color[] {
    return [...this._colors];
  }

  isEqual = (otherPalette: Palette): boolean => {
    if (otherPalette.colors.length !== this.colors.length) {
      return false;
    }

    return this.colors.every((color, idx) => {
      const otherColor = otherPalette.colors[idx];
      return color.isEqual(otherColor);
    });
  };

  toNearestIndexGivenColor(targetColor: Color): number {
    const distances = this._colors.map((c, idx) => {
      return {
        idx,
        distance: c.toDistanceGivenColor(targetColor),
      };
    });

    const ordered = ArrayUtil.arrayWithOrderFromValue(
      distances,
      (d) => d.distance
    );

    return ordered[0].idx;
  }

  toNearestColorGivenColor(targetColor: Color): Color {
    return this.toOptionalColorGivenIndex(
      this.toNearestIndexGivenColor(targetColor)
    )!;
  }

  toOptionalColorGivenIndex(index: number): Color | undefined {
    return this._colors[index];
  }

  toIndexGivenColor(inputColor: Color): number {
    const index = this._colors.findIndex((c) => c.isEqual(inputColor));

    if (index == -1) {
      throw new Error("Color not found in toIndexGivenColor");
    }

    return index;
  }
}
