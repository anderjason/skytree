"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Size2 {
    constructor(width, height) {
        this._width = width;
        this._height = height;
    }
    static ofWidthHeight(width, height) {
        return new Size2(width, height);
    }
    static ofZero() {
        return new Size2(0, 0);
    }
    get width() {
        return this._width;
    }
    get height() {
        return this._height;
    }
    toClone() {
        return new Size2(this._width, this._height);
    }
    isEqual(other) {
        if (other == null) {
            return false;
        }
        return other._width == this._width && other._height == this._height;
    }
}
exports.Size2 = Size2;
//# sourceMappingURL=index.js.map