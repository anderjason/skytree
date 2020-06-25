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
    static givenContainedPoints(points) {
        const allX = points.map((point) => point.x);
        const allY = points.map((point) => point.y);
        const minX = Math.min(...allX);
        const minY = Math.min(...allY);
        const maxX = Math.max(...allX);
        const maxY = Math.max(...allY);
        return Box2.givenOppositeCorners(Point2_1.Point2.givenXY(minX, minY), Point2_1.Point2.givenXY(maxX, maxY));
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
    get leftTop() {
        return Point2_1.Point2.givenXY(this.left, this.top);
    }
    get centerTop() {
        return Point2_1.Point2.givenXY(this.center.x, this.top);
    }
    get rightTop() {
        return Point2_1.Point2.givenXY(this.right, this.top);
    }
    get leftCenter() {
        return Point2_1.Point2.givenXY(this.left, this.center.y);
    }
    get rightCenter() {
        return Point2_1.Point2.givenXY(this.right, this.center.y);
    }
    get leftBottom() {
        return Point2_1.Point2.givenXY(this.left, this.bottom);
    }
    get centerBottom() {
        return Point2_1.Point2.givenXY(this.center.x, this.bottom);
    }
    get rightBottom() {
        return Point2_1.Point2.givenXY(this.right, this.bottom);
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
    withAvailableSize(availableSize, scaleMode, anchor) {
        const newSize = this.size.withAvailableSize(availableSize, scaleMode);
        let centerX;
        switch (anchor) {
            case "leftTop":
            case "leftCenter":
            case "leftBottom":
                centerX = this.left + newSize.width / 2;
                break;
            case "centerTop":
            case "center":
            case "centerBottom":
                centerX = this.center.x;
                break;
            case "rightTop":
            case "rightCenter":
            case "rightBottom":
                centerX = this.right - newSize.width / 2;
                break;
        }
        let centerY;
        switch (anchor) {
            case "leftTop":
            case "centerTop":
            case "rightTop":
                centerY = this.top + newSize.height / 2;
                break;
            case "leftCenter":
            case "center":
            case "rightCenter":
                centerY = this.center.y;
                break;
            case "leftBottom":
            case "centerBottom":
            case "rightBottom":
                centerY = this.bottom - newSize.height / 2;
                break;
        }
        return Box2.givenCenterSize(Point2_1.Point2.givenXY(centerX, centerY), newSize);
    }
}
exports.Box2 = Box2;
//# sourceMappingURL=index.js.map