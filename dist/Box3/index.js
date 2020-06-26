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
    static givenOppositeCorners(pointA, pointB) {
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
    static givenContainedPoints(points) {
        const allX = points.map((point) => point.x);
        const allY = points.map((point) => point.y);
        const allZ = points.map((point) => point.z);
        const minX = Math.min(...allX);
        const minY = Math.min(...allY);
        const minZ = Math.min(...allZ);
        const maxX = Math.max(...allX);
        const maxY = Math.max(...allY);
        const maxZ = Math.max(...allZ);
        return Box3.givenOppositeCorners(Point3_1.Point3.givenXYZ(minX, minY, minZ), Point3_1.Point3.givenXYZ(maxX, maxY, maxZ));
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
    get leftTopFront() {
        return Point3_1.Point3.givenXYZ(this.left, this.top, this.front);
    }
    get centerTopFront() {
        return Point3_1.Point3.givenXYZ(this.center.x, this.top, this.front);
    }
    get rightTopFront() {
        return Point3_1.Point3.givenXYZ(this.right, this.top, this.front);
    }
    get leftCenterFront() {
        return Point3_1.Point3.givenXYZ(this.left, this.center.y, this.front);
    }
    get frontCenter() {
        return Point3_1.Point3.givenXYZ(this.center.x, this.center.y, this.front);
    }
    get rightCenterFront() {
        return Point3_1.Point3.givenXYZ(this.right, this.center.y, this.front);
    }
    get leftBottomFront() {
        return Point3_1.Point3.givenXYZ(this.left, this.bottom, this.front);
    }
    get centerBottomFront() {
        return Point3_1.Point3.givenXYZ(this.center.x, this.bottom, this.front);
    }
    get rightBottomFront() {
        return Point3_1.Point3.givenXYZ(this.right, this.bottom, this.front);
    }
    // ---
    get leftTopCenter() {
        return Point3_1.Point3.givenXYZ(this.left, this.top, this.center.z);
    }
    get topCenter() {
        return Point3_1.Point3.givenXYZ(this.center.x, this.top, this.center.z);
    }
    get rightTopCenter() {
        return Point3_1.Point3.givenXYZ(this.right, this.top, this.center.z);
    }
    get leftCenter() {
        return Point3_1.Point3.givenXYZ(this.left, this.center.y, this.center.z);
    }
    get rightCenter() {
        return Point3_1.Point3.givenXYZ(this.right, this.center.y, this.center.z);
    }
    get leftBottomCenter() {
        return Point3_1.Point3.givenXYZ(this.left, this.bottom, this.center.z);
    }
    get bottomCenter() {
        return Point3_1.Point3.givenXYZ(this.center.x, this.bottom, this.center.z);
    }
    get rightBottomCenter() {
        return Point3_1.Point3.givenXYZ(this.right, this.bottom, this.center.z);
    }
    // ----
    get leftTopBack() {
        return Point3_1.Point3.givenXYZ(this.left, this.top, this.back);
    }
    get centerTopBack() {
        return Point3_1.Point3.givenXYZ(this.center.x, this.top, this.back);
    }
    get rightTopBack() {
        return Point3_1.Point3.givenXYZ(this.right, this.top, this.back);
    }
    get leftCenterBack() {
        return Point3_1.Point3.givenXYZ(this.left, this.center.y, this.back);
    }
    get backCenter() {
        return Point3_1.Point3.givenXYZ(this.center.x, this.center.y, this.back);
    }
    get rightCenterBack() {
        return Point3_1.Point3.givenXYZ(this.right, this.center.y, this.back);
    }
    get leftBottomBack() {
        return Point3_1.Point3.givenXYZ(this.left, this.bottom, this.back);
    }
    get centerBottomBack() {
        return Point3_1.Point3.givenXYZ(this.center.x, this.bottom, this.back);
    }
    get rightBottomBack() {
        return Point3_1.Point3.givenXYZ(this.right, this.bottom, this.back);
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
    withBoundingBox(boundingBox, scaleMode, anchor) {
        const newSize = this.size.withAvailableSize(boundingBox.size, scaleMode);
        let centerX;
        switch (anchor) {
            case "leftTopFront":
            case "leftTopCenter":
            case "leftTopBack":
            case "leftCenterFront":
            case "leftCenter":
            case "leftCenterBack":
            case "leftBottomFront":
            case "leftBottomCenter":
            case "leftBottomBack":
                centerX = boundingBox.left + newSize.toHalf().width;
                break;
            case "centerTopFront":
            case "topCenter":
            case "centerTopBack":
            case "frontCenter":
            case "center":
            case "backCenter":
            case "centerBottomFront":
            case "bottomCenter":
            case "centerBottomBack":
                centerX = boundingBox.center.x;
                break;
            case "rightTopFront":
            case "rightTopCenter":
            case "rightTopBack":
            case "rightCenterFront":
            case "rightCenter":
            case "rightCenterBack":
            case "rightBottomFront":
            case "rightBottomCenter":
            case "rightBottomBack":
                centerX = boundingBox.right - newSize.toHalf().width;
                break;
        }
        let centerY;
        switch (anchor) {
            case "leftTopFront":
            case "centerTopFront":
            case "rightTopFront":
            case "leftTopCenter":
            case "topCenter":
            case "rightTopCenter":
            case "leftTopBack":
            case "centerTopBack":
            case "rightTopBack":
                centerY = boundingBox.top + newSize.toHalf().height;
                break;
            case "leftCenterFront":
            case "frontCenter":
            case "rightCenterFront":
            case "leftCenter":
            case "center":
            case "rightCenter":
            case "leftCenterBack":
            case "backCenter":
            case "rightCenterBack":
                centerY = boundingBox.center.y;
                break;
            case "leftBottomFront":
            case "centerBottomFront":
            case "rightBottomFront":
            case "leftBottomCenter":
            case "bottomCenter":
            case "rightBottomCenter":
            case "leftBottomBack":
            case "centerBottomBack":
            case "rightBottomBack":
                centerY = boundingBox.bottom - newSize.toHalf().height;
                break;
        }
        let centerZ;
        switch (anchor) {
            case "leftTopFront":
            case "centerTopFront":
            case "rightTopFront":
            case "leftCenterFront":
            case "frontCenter":
            case "rightCenterFront":
            case "leftBottomFront":
            case "centerBottomFront":
            case "rightBottomFront":
                centerZ = boundingBox.front - newSize.toHalf().depth;
                break;
            case "leftTopCenter":
            case "topCenter":
            case "rightTopCenter":
            case "leftCenter":
            case "center":
            case "rightCenter":
            case "leftBottomCenter":
            case "bottomCenter":
            case "rightBottomCenter":
                centerZ = boundingBox.center.z;
                break;
            case "leftTopBack":
            case "centerTopBack":
            case "rightTopBack":
            case "leftCenterBack":
            case "backCenter":
            case "rightCenterBack":
            case "leftBottomBack":
            case "centerBottomBack":
            case "rightBottomBack":
                centerZ = boundingBox.back + newSize.toHalf().depth;
                break;
        }
        return Box3.givenCenterSize(Point3_1.Point3.givenXYZ(centerX, centerY, centerZ), newSize);
    }
}
exports.Box3 = Box3;
//# sourceMappingURL=index.js.map