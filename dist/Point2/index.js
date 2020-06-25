"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Point2 = void 0;
class Point2 {
    constructor(x, y) {
        this._x = x;
        this._y = y;
    }
    static givenXY(x, y) {
        return new Point2(x, y);
    }
    static ofZero() {
        return new Point2(0, 0);
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
    get isZero() {
        return this._x === 0 && this._y === 0;
    }
    isEqual(other) {
        if (other == null) {
            return false;
        }
        return other._x == this._x && other._y == this._y;
    }
    toClone() {
        return new Point2(this._x, this._y);
    }
    toAngleGivenPoint(other) {
        const diff = this.toDeltaGivenPoint(other);
        return Math.atan2(diff.y, diff.x);
    }
    toDeltaGivenPoint(other) {
        return new Point2(this.x - other.x, this.y - other.y);
    }
    toDistanceGivenPoint(other) {
        const diff = this.toDeltaGivenPoint(other);
        return Math.sqrt(Math.pow(diff.x, 2) + Math.pow(diff.y, 2));
    }
    toMidpointGivenPoint(other) {
        const x = this.x + (other.x - this.x) / 2;
        const y = this.y + (other.y - this.y) / 2;
        return new Point2(x, y);
    }
    withAngleAndDistance(angle, distance) {
        // Rotate the angle based on the browser coordinate system ([0,0] in the top left)
        const angleRotated = angle + Math.PI / 2;
        const x = this.x + Math.sin(angleRotated) * distance;
        const y = this.y - Math.cos(angleRotated) * distance;
        return new Point2(x, y);
    }
}
exports.Point2 = Point2;
//# sourceMappingURL=index.js.map