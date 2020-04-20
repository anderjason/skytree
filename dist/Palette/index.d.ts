import { Color } from "../Color";
export declare class Palette {
    private _colors;
    static ofColors(colors: Color[]): Palette;
    private constructor();
    get colors(): Color[];
    isEqual: (otherPalette: Palette) => boolean;
    toNearestIndexGivenColor(targetColor: Color): number;
    toNearestColorGivenColor(targetColor: Color): Color;
    toOptionalColorGivenIndex(index: number): Color | undefined;
    toIndexGivenColor(inputColor: Color): number;
}
