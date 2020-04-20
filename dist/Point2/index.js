"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Point2 {
    constructor(x, y) {
        this._x = x;
        this._y = y;
    }
    static ofXY(x, y) {
        return new Point2(x, y);
    }
    get x() {
        return this._x;
    }
    get y() {
        return this._y;
    }
    toClone() {
        return new Point2(this._x, this._y);
    }
    isEqual(other) {
        if (other == null) {
            return false;
        }
        return other._x == this._x && other._y == this._y;
    }
}
exports.Point2 = Point2;
//# sourceMappingURL=index.js.map