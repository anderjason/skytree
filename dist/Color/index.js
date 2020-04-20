"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hsbGivenRgbFloat_1 = require("./_internal/hsbGivenRgbFloat");
const hslGivenRgbFloat_1 = require("./_internal/hslGivenRgbFloat");
const labGivenHcl_1 = require("./_internal/labGivenHcl");
const labGivenXyz_1 = require("./_internal/labGivenXyz");
const hclGivenLab_1 = require("./_internal/hclGivenLab");
const rgbFloatGivenHsl_1 = require("./_internal/rgbFloatGivenHsl");
const rgbFloatGivenXyz_1 = require("./_internal/rgbFloatGivenXyz");
const hsbStringGivenHsb_1 = require("./_internal/hsbStringGivenHsb");
const hslStringGivenHsl_1 = require("./_internal/hslStringGivenHsl");
const rgbStringGivenRgbFloat_1 = require("./_internal/rgbStringGivenRgbFloat");
const xyzGivenLab_1 = require("./_internal/xyzGivenLab");
const xyzGivenRgbFloat_1 = require("./_internal/xyzGivenRgbFloat");
const rgbFloatGivenHex_1 = require("./_internal/rgbFloatGivenHex");
const Ratio_1 = require("../Ratio");
const hexGivenRgb_1 = require("./_internal/hexGivenRgb");
const highContrastColorGivenColor_1 = require("./_internal/highContrastColorGivenColor");
const numberWithHardLimit_1 = require("../NumberUtil/numberWithHardLimit");
const distanceGivenColors_1 = require("./_internal/distanceGivenColors");
const numberWithRangeMap_1 = require("../NumberUtil/numberWithRangeMap");
const NumberUtil_1 = require("../NumberUtil");
class Color {
    constructor(labColor, alpha) {
        this._labColor = labColor;
        this._alpha = alpha;
    }
    static ofHslFloat(hslColor, alpha = Ratio_1.Ratio.ofDecimal(1)) {
        return Color.ofRgbFloat(rgbFloatGivenHsl_1.rgbFloatGivenHsl(hslColor), alpha);
    }
    static ofHex(hexColor) {
        return Color.ofRgbFloat(rgbFloatGivenHex_1.rgbFloatGivenHex(hexColor));
    }
    static ofHclFloat(hclColor, alpha = Ratio_1.Ratio.ofDecimal(1)) {
        return new Color(labGivenHcl_1.labGivenHcl(hclColor), alpha);
    }
    static ofRgbFloat(rgbColor, alpha = Ratio_1.Ratio.ofDecimal(1)) {
        const labColor = labGivenXyz_1.labGivenXyz(xyzGivenRgbFloat_1.xyzGivenRgbFloat(rgbColor));
        return new Color(labColor, alpha);
    }
    static ofRgb255(r, g, b, a) {
        return Color.ofRgbFloat({
            r: Ratio_1.Ratio.ofDecimal(numberWithRangeMap_1.numberWithRangeMap(r, 0, 255, 0, 1)),
            g: Ratio_1.Ratio.ofDecimal(numberWithRangeMap_1.numberWithRangeMap(g, 0, 255, 0, 1)),
            b: Ratio_1.Ratio.ofDecimal(numberWithRangeMap_1.numberWithRangeMap(b, 0, 255, 0, 1)),
        }, a);
    }
    static ofNumber(intColor, alpha = 1) {
        let alphaString;
        if (alpha === 1) {
            alphaString = "";
        }
        else {
            alphaString = Math.round(NumberUtil_1.NumberUtil.numberWithHardLimit(alpha, 0, 1) * 255)
                .toString(16)
                .padStart(2, "0");
        }
        const hex = `#${intColor.toString(16).padStart(6, "0")}${alphaString}`;
        return Color.ofHex(hex);
    }
    isEqual(otherColor) {
        if (otherColor == null) {
            return false;
        }
        return (this._labColor.a === otherColor._labColor.a &&
            this._labColor.b === otherColor._labColor.b &&
            this._labColor.l === otherColor._labColor.l);
    }
    withLightness(absoluteLightness) {
        const { a, b } = this._labColor;
        return new Color({
            l: absoluteLightness * 100,
            a,
            b,
        }, this._alpha);
    }
    withRelativeLightness(relativeLightness) {
        const { l } = this._labColor;
        return this.withLightness(l / 100 + relativeLightness);
    }
    withHue(absoluteHue) {
        const { s, l } = hslGivenRgbFloat_1.hslGivenRgbFloat(this.toRgbFloatColor());
        return new Color(labGivenXyz_1.labGivenXyz(xyzGivenRgbFloat_1.xyzGivenRgbFloat(rgbFloatGivenHsl_1.rgbFloatGivenHsl({
            h: absoluteHue,
            s,
            l,
        }))), this._alpha);
    }
    withRelativeHue(relativeHue) {
        const { h } = hslGivenRgbFloat_1.hslGivenRgbFloat(this.toRgbFloatColor());
        let absoluteHue = h.toDecimal() + relativeHue.toDecimal();
        if (absoluteHue > 1) {
            absoluteHue -= 1;
        }
        if (absoluteHue < 0) {
            absoluteHue += 1;
        }
        return this.withHue(Ratio_1.Ratio.ofDecimal(absoluteHue));
    }
    withSaturation(absoluteSaturation) {
        let { l, h } = hclGivenLab_1.hclGivenLab(this._labColor);
        return new Color(labGivenHcl_1.labGivenHcl({ h, c: absoluteSaturation, l }), this._alpha);
    }
    withRelativeSaturation(relativeSaturation) {
        const hcl = hclGivenLab_1.hclGivenLab(this._labColor);
        let c = hcl.c.toDecimal();
        c = numberWithHardLimit_1.numberWithHardLimit(c + relativeSaturation.toDecimal(), 0, 1);
        return this.withSaturation(Ratio_1.Ratio.ofDecimal(c));
    }
    withAlpha(absoluteAlpha) {
        return new Color(this._labColor, absoluteAlpha);
    }
    withRelativeAlpha(relativeAlpha) {
        return this.withAlpha(this._alpha.withAddedRatio(relativeAlpha));
    }
    toDistanceGivenColor(otherColor) {
        return distanceGivenColors_1.distanceGivenColors(this, otherColor);
    }
    toString() {
        return this.toRgbString();
    }
    toHexString() {
        if (this._hexString == null) {
            this._hexString = hexGivenRgb_1.hexGivenRgb(this.toRgbFloatColor(), this._alpha);
        }
        return this._hexString;
    }
    toLabColor() {
        return {
            l: this._labColor.l,
            a: this._labColor.a,
            b: this._labColor.b,
        };
    }
    toRgbFloatColor() {
        return rgbFloatGivenXyz_1.rgbFloatGivenXyz(xyzGivenLab_1.xyzGivenLab(this._labColor));
    }
    toRgbString() {
        return rgbStringGivenRgbFloat_1.rgbStringGivenRgbFloat(this.toRgbFloatColor(), this._alpha);
    }
    toHslColor() {
        return hslGivenRgbFloat_1.hslGivenRgbFloat(this.toRgbFloatColor());
    }
    toHslString() {
        return hslStringGivenHsl_1.hslStringGivenHsl(this.toHslColor());
    }
    toHsbColor() {
        return hsbGivenRgbFloat_1.hsbGivenRgbFloat(this.toRgbFloatColor());
    }
    toHsbString() {
        return hsbStringGivenHsb_1.hsbStringGivenHsb(this.toHsbColor());
    }
    toHclColor() {
        return hclGivenLab_1.hclGivenLab(this._labColor);
    }
    toHighContrastColor() {
        return highContrastColorGivenColor_1.highContrastColorGivenColor(this);
    }
    toNumber() {
        return parseInt(this.toHexString().slice(1, 7), 16);
    }
}
exports.Color = Color;
//# sourceMappingURL=index.js.map