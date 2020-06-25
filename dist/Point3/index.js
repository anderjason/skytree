"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Point3 = void 0;
class Point3 {
    constructor(x, y, z) {
        this._x = x;
        this._y = y;
        this._z = z;
    }
    static givenXYZ(x, y, z) {
        return new Point3(x, y, z);
    }
    static ofZero() {
        return new Point3(0, 0, 0);
    }
    static isEqual(a, b) {
        if (a == null && b == null) {
            return true;
        }
        if (a == null || b == null) {
            return false;
        }
        return a.isEqual(b);
    }
    get x() {
        return this._x;
    }
    get y() {
        return this._y;
    }
    get z() {
        return this._z;
    }
    get isZero() {
        return this._x === 0 && this._y === 0 && this._z === 0;
    }
    toClone() {
        return new Point3(this._x, this._y, this._z);
    }
    isEqual(other) {
        if (other == null) {
            return false;
        }
        return other._x == this._x && other._y == this._y && other._z == this._z;
    }
}
exports.Point3 = Point3;
//# sourceMappingURL=index.js.map