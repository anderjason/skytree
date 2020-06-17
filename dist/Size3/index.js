"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Size3 = void 0;
class Size3 {
    constructor(width, height, depth) {
        this._width = width;
        this._height = height;
        this._depth = depth;
    }
    static ofWidthHeightDepth(width, height, depth) {
        return new Size3(width, height, depth);
    }
    static ofZero() {
        return new Size3(0, 0, 0);
    }
    static isEqual(newValue, oldValue) {
        if (newValue == null || oldValue == null) {
            return false;
        }
        return newValue.isEqual(oldValue);
    }
    get width() {
        return this._width;
    }
    get height() {
        return this._height;
    }
    get depth() {
        return this._depth;
    }
    toClone() {
        return new Size3(this._width, this._height, this._depth);
    }
    isEqual(other) {
        if (other == null) {
            return false;
        }
        return (other._width == this._width &&
            other._height == this._height &&
            other._depth == this._depth);
    }
}
exports.Size3 = Size3;
//# sourceMappingURL=index.js.map