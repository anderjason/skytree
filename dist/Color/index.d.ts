import { Ratio } from "../Ratio";
export interface HsbColor {
    h: number;
    s: number;
    b: number;
}
export interface HslColor {
    h: Ratio;
    s: Ratio;
    l: Ratio;
}
export interface LabColor {
    l: number;
    a: number;
    b: number;
}
export interface HclColor {
    h: Ratio;
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
export declare class Color {
    private _labColor;
    private _alpha;
    private _hexString;
    static isEqual(a: Color, b: Color): boolean;
    static givenHslFloat(hslColor: HslColor, alpha?: Ratio): Color;
    static givenHex(hexColor: string): Color;
    static givenHclFloat(hclColor: HclColor, alpha?: Ratio): Color;
    static givenRgbFloat(rgbColor: RgbFloatColor, alpha?: Ratio): Color;
    static givenRgb255(r: number, g: number, b: number, a?: Ratio): Color;
    static givenColorNumber(intColor: number, alpha?: number): Color;
    private constructor();
    isEqual(otherColor: Color): boolean;
    withLightness(absoluteLightness: number): Color;
    withRelativeLightness(relativeLightness: number): Color;
    withHue(absoluteHue: Ratio): Color;
    withRelativeHue(relativeHue: Ratio): Color;
    withSaturation(absoluteSaturation: Ratio): Color;
    withRelativeSaturation(relativeSaturation: Ratio): Color;
    withAlpha(absoluteAlpha: Ratio): Color;
    withRelativeAlpha(relativeAlpha: Ratio): Color;
    toDistanceGivenColor(otherColor: Color): number;
    toString(): string;
    toHexString(): string;
    toLabColor(): LabColor;
    toRgbFloatColor(): RgbFloatColor;
    toRgbString(): string;
    toHslColor(): HslColor;
    toHslString(): string;
    toHsbColor(): HsbColor;
    toHsbString(): string;
    toHclColor(): HclColor;
    toHighContrastColor(): Color;
    toColorNumber(): number;
}
