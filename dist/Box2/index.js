"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Box2 = void 0;
const Point2_1 = require("../Point2");
const Size2_1 = require("../Size2");
class Box2 {
    constructor(center, size) {
        this.center = center;
        this.size = size;
    }
    static givenCenterSize(center, size) {
        return new Box2(center, size);
    }
    static givenOppositeCorners(pointA, pointB) {
        const minX = Math.min(pointA.x, pointB.x);
        const minY = Math.min(pointA.y, pointB.y);
        const maxX = Math.max(pointA.x, pointB.x);
        const maxY = Math.max(pointA.y, pointB.y);
        const size = Size2_1.Size2.givenWidthHeight(maxX - minX, maxY - minY);
        const center = Point2_1.Point2.givenXY(minX + size.width / 2, minY + size.height / 2);
        return this.givenCenterSize(center, size);
    }
    static givenTopLeftSize(topLeft, size) {
        const center = Point2_1.Point2.givenXY(topLeft.x + size.width / 2, topLeft.y + size.height / 2);
        return this.givenCenterSize(center, size);
    }
    static isEqual(newValue, oldValue) {
        if (newValue == null || oldValue == null) {
            return false;
        }
        return newValue.isEqual(oldValue);
    }
    get top() {
        return this.center.y - this.size.height / 2;
    }
    get left() {
        return this.center.x - this.size.width / 2;
    }
    get right() {
        return this.center.x + this.size.width / 2;
    }
    get bottom() {
        return this.center.y + this.size.height / 2;
    }
    containsPoint(point) {
        return (point.x >= this.left &&
            point.x <= this.right &&
            point.y >= this.top &&
            point.y <= this.bottom);
    }
    isEqual(other) {
        if (other == null) {
            return false;
        }
        return other.center.isEqual(this.center) && other.size.isEqual(this.size);
    }
}
exports.Box2 = Box2;
//# sourceMappingURL=index.js.map