"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const assert = require("assert");
const _1 = require(".");
const __1 = require("..");
describe("Box3", () => {
    describe("can be created from a set of contained points", () => {
        const points = [
            __1.Point3.givenXYZ(100, 100, 50),
            __1.Point3.givenXYZ(300, 250, 500),
            __1.Point3.givenXYZ(400, 300, 105),
            __1.Point3.givenXYZ(50, 400, 250),
            __1.Point3.givenXYZ(125, 70, 590),
        ];
        const actual = _1.Box3.givenContainedPoints(points);
        const expected = _1.Box3.givenOppositeCorners(__1.Point3.givenXYZ(50, 70, 50), __1.Point3.givenXYZ(400, 400, 590));
        assert(actual.isEqual(expected));
    });
    describe("can be adjusted to fit a larger bounding box", () => {
        it("with left top front alignment", () => {
            const original = _1.Box3.givenCenterSize(__1.Point3.givenXYZ(100, 100, 100), __1.Size3.givenWidthHeightDepth(20, 40, 30));
            const availableSize = __1.Size3.givenWidthHeightDepth(1000, 1000, 1000);
            const actual = original.withAvailableSize(availableSize, "flexible", "leftTopFront");
            const expected = _1.Box3.givenCenterSize(__1.Point3.givenXYZ(100, 100, 100), __1.Size3.givenWidthHeightDepth(500, 1000, 750));
            assert.strictEqual(actual.left, original.left);
            assert.strictEqual(actual.top, original.top);
            assert.strictEqual(actual.front, original.front);
            assert(actual.size.isEqual(expected.size));
        });
        it("with center top front alignment", () => {
            const original = _1.Box3.givenCenterSize(__1.Point3.givenXYZ(100, 100, 100), __1.Size3.givenWidthHeightDepth(20, 40, 30));
            const availableSize = __1.Size3.givenWidthHeightDepth(1000, 1000, 1000);
            const actual = original.withAvailableSize(availableSize, "flexible", "centerTopFront");
            const expected = _1.Box3.givenCenterSize(__1.Point3.givenXYZ(100, 100, 100), __1.Size3.givenWidthHeightDepth(500, 1000, 750));
            assert.strictEqual(actual.center.x, original.center.x);
            assert.strictEqual(actual.top, original.top);
            assert.strictEqual(actual.front, original.front);
            assert(actual.size.isEqual(expected.size));
        });
        it("with right top front alignment", () => {
            const original = _1.Box3.givenCenterSize(__1.Point3.givenXYZ(100, 100, 100), __1.Size3.givenWidthHeightDepth(20, 40, 30));
            const availableSize = __1.Size3.givenWidthHeightDepth(1000, 1000, 1000);
            const actual = original.withAvailableSize(availableSize, "flexible", "rightTopFront");
            const expected = _1.Box3.givenCenterSize(__1.Point3.givenXYZ(100, 100, 100), __1.Size3.givenWidthHeightDepth(500, 1000, 750));
            assert.strictEqual(actual.right, original.right);
            assert.strictEqual(actual.top, original.top);
            assert.strictEqual(actual.front, original.front);
            assert(actual.size.isEqual(expected.size));
        });
        it("with left center front alignment", () => {
            const original = _1.Box3.givenCenterSize(__1.Point3.givenXYZ(100, 100, 100), __1.Size3.givenWidthHeightDepth(20, 40, 30));
            const availableSize = __1.Size3.givenWidthHeightDepth(1000, 1000, 1000);
            const actual = original.withAvailableSize(availableSize, "flexible", "leftCenterFront");
            const expected = _1.Box3.givenCenterSize(__1.Point3.givenXYZ(100, 100, 100), __1.Size3.givenWidthHeightDepth(500, 1000, 750));
            assert.strictEqual(actual.left, original.left);
            assert.strictEqual(actual.center.y, original.center.y);
            assert.strictEqual(actual.front, original.front);
            assert(actual.size.isEqual(expected.size));
        });
        it("with center front alignment", () => {
            const original = _1.Box3.givenCenterSize(__1.Point3.givenXYZ(100, 100, 100), __1.Size3.givenWidthHeightDepth(20, 40, 30));
            const availableSize = __1.Size3.givenWidthHeightDepth(1000, 1000, 1000);
            const actual = original.withAvailableSize(availableSize, "flexible", "frontCenter");
            const expected = _1.Box3.givenCenterSize(__1.Point3.givenXYZ(100, 100, 100), __1.Size3.givenWidthHeightDepth(500, 1000, 750));
            assert.strictEqual(actual.center.x, original.center.x);
            assert.strictEqual(actual.center.y, original.center.y);
            assert.strictEqual(actual.front, original.front);
            assert(actual.size.isEqual(expected.size));
        });
        it("with left bottom front alignment", () => {
            const original = _1.Box3.givenCenterSize(__1.Point3.givenXYZ(100, 100, 100), __1.Size3.givenWidthHeightDepth(20, 40, 30));
            const availableSize = __1.Size3.givenWidthHeightDepth(1000, 1000, 1000);
            const actual = original.withAvailableSize(availableSize, "flexible", "leftBottomFront");
            const expected = _1.Box3.givenCenterSize(__1.Point3.givenXYZ(100, 100, 100), __1.Size3.givenWidthHeightDepth(500, 1000, 750));
            assert.strictEqual(actual.left, original.left);
            assert.strictEqual(actual.bottom, original.bottom);
            assert.strictEqual(actual.front, original.front);
            assert(actual.size.isEqual(expected.size));
        });
        it("with center bottom front alignment", () => {
            const original = _1.Box3.givenCenterSize(__1.Point3.givenXYZ(100, 100, 100), __1.Size3.givenWidthHeightDepth(20, 40, 30));
            const availableSize = __1.Size3.givenWidthHeightDepth(1000, 1000, 1000);
            const actual = original.withAvailableSize(availableSize, "flexible", "centerBottomFront");
            const expected = _1.Box3.givenCenterSize(__1.Point3.givenXYZ(100, 100, 100), __1.Size3.givenWidthHeightDepth(500, 1000, 750));
            assert.strictEqual(actual.center.x, original.center.x);
            assert.strictEqual(actual.bottom, original.bottom);
            assert.strictEqual(actual.front, original.front);
            assert(actual.size.isEqual(expected.size));
        });
        it("with right center front alignment", () => {
            const original = _1.Box3.givenCenterSize(__1.Point3.givenXYZ(100, 100, 100), __1.Size3.givenWidthHeightDepth(20, 40, 30));
            const availableSize = __1.Size3.givenWidthHeightDepth(1000, 1000, 1000);
            const actual = original.withAvailableSize(availableSize, "flexible", "rightCenterFront");
            const expected = _1.Box3.givenCenterSize(__1.Point3.givenXYZ(100, 100, 100), __1.Size3.givenWidthHeightDepth(500, 1000, 750));
            assert.strictEqual(actual.right, original.right);
            assert.strictEqual(actual.center.y, original.center.y);
            assert.strictEqual(actual.front, original.front);
            assert(actual.size.isEqual(expected.size));
        });
    });
});
//# sourceMappingURL=index.spec.js.map