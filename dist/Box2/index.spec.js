"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const assert = require("assert");
const _1 = require(".");
const __1 = require("..");
describe("Box2", () => {
    describe("can be created from a set of contained points", () => {
        const points = [
            __1.Point2.givenXY(100, 100),
            __1.Point2.givenXY(300, 250),
            __1.Point2.givenXY(400, 300),
            __1.Point2.givenXY(50, 400),
            __1.Point2.givenXY(125, 70),
        ];
        const actual = _1.Box2.givenContainedPoints(points);
        const expected = _1.Box2.givenOppositeCorners(__1.Point2.givenXY(50, 70), __1.Point2.givenXY(400, 400));
        assert(actual.isEqual(expected));
    });
    describe("can be adjusted to fit a larger bounding box", () => {
        it("with top left alignment", () => {
            const original = _1.Box2.givenCenterSize(__1.Point2.givenXY(100, 100), __1.Size2.givenWidthHeight(20, 40));
            const availableSize = __1.Size2.givenWidthHeight(1000, 1000);
            const actual = original.withAvailableSize(availableSize, "flexible", "leftTop");
            const expected = _1.Box2.givenCenterSize(__1.Point2.givenXY(100, 100), __1.Size2.givenWidthHeight(500, 1000));
            assert(actual.leftTop.isEqual(original.leftTop));
            assert(actual.size.isEqual(expected.size));
        });
        it("with top center alignment", () => {
            const original = _1.Box2.givenCenterSize(__1.Point2.givenXY(100, 100), __1.Size2.givenWidthHeight(20, 40));
            const availableSize = __1.Size2.givenWidthHeight(1000, 1000);
            const actual = original.withAvailableSize(availableSize, "flexible", "centerTop");
            const expected = _1.Box2.givenCenterSize(__1.Point2.givenXY(100, 100), __1.Size2.givenWidthHeight(500, 1000));
            assert(actual.centerTop.isEqual(original.centerTop));
            assert(actual.size.isEqual(expected.size));
        });
        it("with top right alignment", () => {
            const original = _1.Box2.givenCenterSize(__1.Point2.givenXY(100, 100), __1.Size2.givenWidthHeight(20, 40));
            const availableSize = __1.Size2.givenWidthHeight(1000, 1000);
            const actual = original.withAvailableSize(availableSize, "flexible", "rightTop");
            const expected = _1.Box2.givenCenterSize(__1.Point2.givenXY(100, 100), __1.Size2.givenWidthHeight(500, 1000));
            assert(actual.rightTop.isEqual(original.rightTop));
            assert(actual.size.isEqual(expected.size));
        });
        it("with left center alignment", () => {
            const original = _1.Box2.givenCenterSize(__1.Point2.givenXY(100, 100), __1.Size2.givenWidthHeight(20, 40));
            const availableSize = __1.Size2.givenWidthHeight(1000, 1000);
            const actual = original.withAvailableSize(availableSize, "flexible", "leftCenter");
            const expected = _1.Box2.givenCenterSize(__1.Point2.givenXY(100, 100), __1.Size2.givenWidthHeight(500, 1000));
            assert(actual.leftCenter.isEqual(original.leftCenter));
            assert(actual.size.isEqual(expected.size));
        });
        it("with center alignment", () => {
            const original = _1.Box2.givenCenterSize(__1.Point2.givenXY(100, 100), __1.Size2.givenWidthHeight(20, 40));
            const availableSize = __1.Size2.givenWidthHeight(1000, 1000);
            const actual = original.withAvailableSize(availableSize, "flexible", "center");
            const expected = _1.Box2.givenCenterSize(__1.Point2.givenXY(100, 100), __1.Size2.givenWidthHeight(500, 1000));
            assert(actual.isEqual(expected));
        });
        it("with right center alignment", () => {
            const original = _1.Box2.givenCenterSize(__1.Point2.givenXY(100, 100), __1.Size2.givenWidthHeight(20, 40));
            const availableSize = __1.Size2.givenWidthHeight(1000, 1000);
            const actual = original.withAvailableSize(availableSize, "flexible", "rightCenter");
            const expected = _1.Box2.givenCenterSize(__1.Point2.givenXY(100, 100), __1.Size2.givenWidthHeight(500, 1000));
            assert(actual.rightCenter.isEqual(original.rightCenter));
            assert(actual.size.isEqual(expected.size));
        });
        it("with left bottom alignment", () => {
            const original = _1.Box2.givenCenterSize(__1.Point2.givenXY(100, 100), __1.Size2.givenWidthHeight(20, 40));
            const availableSize = __1.Size2.givenWidthHeight(1000, 1000);
            const actual = original.withAvailableSize(availableSize, "flexible", "leftBottom");
            const expected = _1.Box2.givenCenterSize(__1.Point2.givenXY(100, 100), __1.Size2.givenWidthHeight(500, 1000));
            assert(actual.leftBottom.isEqual(original.leftBottom));
            assert(actual.size.isEqual(expected.size));
        });
        it("with center bottom alignment", () => {
            const original = _1.Box2.givenCenterSize(__1.Point2.givenXY(100, 100), __1.Size2.givenWidthHeight(20, 40));
            const availableSize = __1.Size2.givenWidthHeight(1000, 1000);
            const actual = original.withAvailableSize(availableSize, "flexible", "centerBottom");
            const expected = _1.Box2.givenCenterSize(__1.Point2.givenXY(100, 100), __1.Size2.givenWidthHeight(500, 1000));
            assert(actual.centerBottom.isEqual(original.centerBottom));
            assert(actual.size.isEqual(expected.size));
        });
        it("with right center alignment", () => {
            const original = _1.Box2.givenCenterSize(__1.Point2.givenXY(100, 100), __1.Size2.givenWidthHeight(20, 40));
            const availableSize = __1.Size2.givenWidthHeight(1000, 1000);
            const actual = original.withAvailableSize(availableSize, "flexible", "rightBottom");
            const expected = _1.Box2.givenCenterSize(__1.Point2.givenXY(100, 100), __1.Size2.givenWidthHeight(500, 1000));
            assert(actual.rightBottom.isEqual(original.rightBottom));
            assert(actual.size.isEqual(expected.size));
        });
    });
    describe("can be adjusted to fit a smaller bounding box", () => {
        it("with top left alignment", () => {
            const original = _1.Box2.givenCenterSize(__1.Point2.givenXY(100, 100), __1.Size2.givenWidthHeight(20, 40));
            const availableSize = __1.Size2.givenWidthHeight(10, 10);
            const actual = original.withAvailableSize(availableSize, "flexible", "leftTop");
            const expected = _1.Box2.givenCenterSize(__1.Point2.givenXY(100, 100), __1.Size2.givenWidthHeight(5, 10));
            assert(actual.leftTop.isEqual(original.leftTop));
            assert(actual.size.isEqual(expected.size));
        });
        it("with top center alignment", () => {
            const original = _1.Box2.givenCenterSize(__1.Point2.givenXY(100, 100), __1.Size2.givenWidthHeight(20, 40));
            const availableSize = __1.Size2.givenWidthHeight(10, 10);
            const actual = original.withAvailableSize(availableSize, "flexible", "centerTop");
            const expected = _1.Box2.givenCenterSize(__1.Point2.givenXY(100, 100), __1.Size2.givenWidthHeight(5, 10));
            assert(actual.centerTop.isEqual(original.centerTop));
            assert(actual.size.isEqual(expected.size));
        });
        it("with top right alignment", () => {
            const original = _1.Box2.givenCenterSize(__1.Point2.givenXY(100, 100), __1.Size2.givenWidthHeight(20, 40));
            const availableSize = __1.Size2.givenWidthHeight(10, 10);
            const actual = original.withAvailableSize(availableSize, "flexible", "rightTop");
            const expected = _1.Box2.givenCenterSize(__1.Point2.givenXY(100, 100), __1.Size2.givenWidthHeight(5, 10));
            assert(actual.rightTop.isEqual(original.rightTop));
            assert(actual.size.isEqual(expected.size));
        });
        it("with left center alignment", () => {
            const original = _1.Box2.givenCenterSize(__1.Point2.givenXY(100, 100), __1.Size2.givenWidthHeight(20, 40));
            const availableSize = __1.Size2.givenWidthHeight(10, 10);
            const actual = original.withAvailableSize(availableSize, "flexible", "leftCenter");
            const expected = _1.Box2.givenCenterSize(__1.Point2.givenXY(100, 100), __1.Size2.givenWidthHeight(5, 10));
            assert(actual.leftCenter.isEqual(original.leftCenter));
            assert(actual.size.isEqual(expected.size));
        });
        it("with center alignment", () => {
            const original = _1.Box2.givenCenterSize(__1.Point2.givenXY(100, 100), __1.Size2.givenWidthHeight(20, 40));
            const availableSize = __1.Size2.givenWidthHeight(10, 10);
            const actual = original.withAvailableSize(availableSize, "flexible", "center");
            const expected = _1.Box2.givenCenterSize(__1.Point2.givenXY(100, 100), __1.Size2.givenWidthHeight(5, 10));
            assert(actual.isEqual(expected));
        });
        it("with right center alignment", () => {
            const original = _1.Box2.givenCenterSize(__1.Point2.givenXY(100, 100), __1.Size2.givenWidthHeight(20, 40));
            const availableSize = __1.Size2.givenWidthHeight(10, 10);
            const actual = original.withAvailableSize(availableSize, "flexible", "rightCenter");
            const expected = _1.Box2.givenCenterSize(__1.Point2.givenXY(100, 100), __1.Size2.givenWidthHeight(5, 10));
            assert(actual.rightCenter.isEqual(original.rightCenter));
            assert(actual.size.isEqual(expected.size));
        });
        it("with left bottom alignment", () => {
            const original = _1.Box2.givenCenterSize(__1.Point2.givenXY(100, 100), __1.Size2.givenWidthHeight(20, 40));
            const availableSize = __1.Size2.givenWidthHeight(10, 10);
            const actual = original.withAvailableSize(availableSize, "flexible", "leftBottom");
            const expected = _1.Box2.givenCenterSize(__1.Point2.givenXY(100, 100), __1.Size2.givenWidthHeight(5, 10));
            assert(actual.leftBottom.isEqual(original.leftBottom));
            assert(actual.size.isEqual(expected.size));
        });
        it("with center bottom alignment", () => {
            const original = _1.Box2.givenCenterSize(__1.Point2.givenXY(100, 100), __1.Size2.givenWidthHeight(20, 40));
            const availableSize = __1.Size2.givenWidthHeight(10, 10);
            const actual = original.withAvailableSize(availableSize, "flexible", "centerBottom");
            const expected = _1.Box2.givenCenterSize(__1.Point2.givenXY(100, 100), __1.Size2.givenWidthHeight(5, 10));
            assert(actual.centerBottom.isEqual(original.centerBottom));
            assert(actual.size.isEqual(expected.size));
        });
        it("with right center alignment", () => {
            const original = _1.Box2.givenCenterSize(__1.Point2.givenXY(100, 100), __1.Size2.givenWidthHeight(20, 40));
            const availableSize = __1.Size2.givenWidthHeight(10, 10);
            const actual = original.withAvailableSize(availableSize, "flexible", "rightBottom");
            const expected = _1.Box2.givenCenterSize(__1.Point2.givenXY(100, 100), __1.Size2.givenWidthHeight(5, 10));
            assert(actual.rightBottom.isEqual(original.rightBottom));
            assert(actual.size.isEqual(expected.size));
        });
    });
});
//# sourceMappingURL=index.spec.js.map