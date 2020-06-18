"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Box3 = void 0;
const Size3_1 = require("../Size3");
const Point3_1 = require("../Point3");
class Box3 {
    constructor(center, size) {
        this.center = center;
        this.size = size;
    }
    static givenCenterSize(center, size) {
        return new Box3(center, size);
    }
    static givenCorners(pointA, pointB) {
        const minX = Math.min(pointA.x, pointB.x);
        const minY = Math.min(pointA.y, pointB.y);
        const minZ = Math.min(pointA.z, pointB.z);
        const maxX = Math.max(pointA.x, pointB.x);
        const maxY = Math.max(pointA.y, pointB.y);
        const maxZ = Math.max(pointA.z, pointB.z);
        const size = Size3_1.Size3.givenWidthHeightDepth(maxX - minX, maxY - minY, maxZ - minZ);
        const center = Point3_1.Point3.givenXYZ(minX + size.width / 2, minY + size.height / 2, minZ + size.depth / 2);
        return this.givenCenterSize(center, size);
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
    get front() {
        return this.center.z + this.size.depth / 2;
    }
    get back() {
        return this.center.z - this.size.depth / 2;
    }
    containsPoint(point) {
        return (point.x >= this.left &&
            point.x <= this.right &&
            point.y >= this.top &&
            point.y <= this.bottom &&
            point.z <= this.front &&
            point.z >= this.back);
    }
    isEqual(other) {
        if (other == null) {
            return false;
        }
        return other.center.isEqual(this.center) && other.size.isEqual(this.size);
    }
}
exports.Box3 = Box3;
//# sourceMappingURL=index.js.map