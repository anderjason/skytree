import { Color } from "../Color";
export declare class Palette {
    private _colors;
    static givenColors(colors: Color[]): Palette;
    static givenCanvas(canvas: HTMLCanvasElement, maxColors: number): Palette;
    private constructor();
    get colors(): Color[];
    isEqual: (otherPalette: Palette) => boolean;
    toNearestIndexGivenColor(targetColor: Color): number;
    toNearestColorGivenColor(targetColor: Color): Color;
    toOptionalColorGivenIndex(index: number): Color | undefined;
    toIndexGivenColor(inputColor: Color): number;
}
