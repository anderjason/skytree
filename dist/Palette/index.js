"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ArrayUtil_1 = require("../ArrayUtil");
class Palette {
    constructor(colors) {
        this.isEqual = (otherPalette) => {
            if (otherPalette.colors.length !== this.colors.length) {
                return false;
            }
            return this.colors.every((color, idx) => {
                const otherColor = otherPalette.colors[idx];
                return color.isEqual(otherColor);
            });
        };
        this._colors = colors;
    }
    static ofColors(colors) {
        return new Palette(colors);
    }
    get colors() {
        return [...this._colors];
    }
    toNearestIndexGivenColor(targetColor) {
        const distances = this._colors.map((c, idx) => {
            return {
                idx,
                distance: c.toDistanceGivenColor(targetColor),
            };
        });
        const ordered = ArrayUtil_1.ArrayUtil.arrayWithOrderFromValue(distances, (d) => d.distance);
        return ordered[0].idx;
    }
    toNearestColorGivenColor(targetColor) {
        return this.toOptionalColorGivenIndex(this.toNearestIndexGivenColor(targetColor));
    }
    toOptionalColorGivenIndex(index) {
        return this._colors[index];
    }
    toIndexGivenColor(inputColor) {
        const index = this._colors.findIndex((c) => c.isEqual(inputColor));
        if (index == -1) {
            throw new Error("Color not found in toIndexGivenColor");
        }
        return index;
    }
}
exports.Palette = Palette;
//# sourceMappingURL=index.js.map