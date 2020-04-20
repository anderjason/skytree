"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Point3 {
    constructor(x, y, z) {
        this._x = x;
        this._y = y;
        this._z = z;
    }
    static ofXYZ(x, y, z) {
        return new Point3(x, y, z);
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