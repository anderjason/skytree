"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Point2_1 = require("../Point2");
const Size2_1 = require("../Size2");
class Box2 {
    constructor(center, size) {
        this.center = center;
        this.size = size;
    }
    static ofCenterSize(center, size) {
        return new Box2(center, size);
    }
    static ofCorners(pointA, pointB) {
        const minX = Math.min(pointA.x, pointB.x);
        const minY = Math.min(pointA.y, pointB.y);
        const maxX = Math.max(pointA.x, pointB.x);
        const maxY = Math.max(pointA.y, pointB.y);
        const size = Size2_1.Size2.ofWidthHeight(maxX - minX, maxY - minY);
        const center = Point2_1.Point2.ofXY(minX + size.width / 2, minY + size.height / 2);
        return this.ofCenterSize(center, size);
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