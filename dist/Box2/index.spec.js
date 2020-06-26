"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const assert = require("assert");
const _1 = require(".");
const __1 = require("..");
const anchors = [
    "leftTop",
    "centerTop",
    "rightTop",
    "leftCenter",
    "center",
    "rightCenter",
    "leftBottom",
    "centerBottom",
    "rightBottom",
];
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
        const expectedSize = __1.Size2.givenWidthHeight(500, 1000);
        const boundingBox = _1.Box2.givenTopLeftSize(__1.Point2.ofZero(), __1.Size2.givenWidthHeight(1000, 1000));
        const original = _1.Box2.givenCenterSize(__1.Point2.givenXY(100, 100), __1.Size2.givenWidthHeight(20, 40));
        it("with all anchors", () => {
            anchors.forEach((anchor) => {
                const actual = original.withBoundingBox(boundingBox, "flexible", anchor);
                assert(actual[anchor].isEqual(boundingBox[anchor]), `Anchor ${anchor} box does not match`);
                assert(actual.size.isEqual(expectedSize));
            });
        });
    });
    describe("can be adjusted to fit a smaller bounding box", () => {
        const original = _1.Box2.givenCenterSize(__1.Point2.givenXY(100, 100), __1.Size2.givenWidthHeight(20, 40));
        const expectedSize = __1.Size2.givenWidthHeight(5, 10);
        const boundingBox = _1.Box2.givenTopLeftSize(__1.Point2.ofZero(), __1.Size2.givenWidthHeight(10, 10));
        it("with all anchors", () => {
            anchors.forEach((anchor) => {
                const actual = original.withBoundingBox(boundingBox, "flexible", anchor);
                assert(actual[anchor].isEqual(boundingBox[anchor]), `Anchor ${anchor} box does not match`);
                assert(actual.size.isEqual(expectedSize));
            });
        });
    });
});
//# sourceMappingURL=index.spec.js.map