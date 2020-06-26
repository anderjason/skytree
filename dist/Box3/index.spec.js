"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const assert = require("assert");
const _1 = require(".");
const __1 = require("..");
const anchors = [
    "leftTopFront",
    "centerTopFront",
    "rightTopFront",
    "leftCenterFront",
    "frontCenter",
    "rightCenterFront",
    "leftBottomFront",
    "centerBottomFront",
    "rightBottomFront",
    "leftTopCenter",
    "topCenter",
    "rightTopCenter",
    "leftCenter",
    "center",
    "rightCenter",
    "leftBottomCenter",
    "bottomCenter",
    "rightBottomCenter",
    "leftTopBack",
    "centerTopBack",
    "rightTopBack",
    "leftCenterBack",
    "backCenter",
    "rightCenterBack",
    "leftBottomBack",
    "centerBottomBack",
    "rightBottomBack",
];
describe("Box3", () => {
    describe("can be created from a set of contained points", () => {
        const points = [
            __1.Point3.givenXYZ(100, 100, 100),
            __1.Point3.givenXYZ(300, 250, 50),
            __1.Point3.givenXYZ(400, 300, 19),
            __1.Point3.givenXYZ(50, 400, 592),
            __1.Point3.givenXYZ(125, 70, 300),
        ];
        const actual = _1.Box3.givenContainedPoints(points);
        const expected = _1.Box3.givenOppositeCorners(__1.Point3.givenXYZ(50, 70, 19), __1.Point3.givenXYZ(400, 400, 592));
        assert(actual.isEqual(expected));
    });
    describe("can be adjusted to fit a larger bounding box", () => {
        const expectedSize = __1.Size3.givenWidthHeightDepth(500, 1000, 750);
        const boundingBox = _1.Box3.givenCenterSize(__1.Point3.ofZero(), __1.Size3.givenWidthHeightDepth(1000, 1000, 1000));
        const original = _1.Box3.givenCenterSize(__1.Point3.givenXYZ(100, 100, 100), __1.Size3.givenWidthHeightDepth(20, 40, 30));
        it("with all anchors", () => {
            anchors.forEach((anchor) => {
                const actual = original.withBoundingBox(boundingBox, "flexible", anchor);
                assert(actual[anchor].isEqual(boundingBox[anchor]), `Anchor ${anchor} box does not match`);
                assert(actual.size.isEqual(expectedSize));
            });
        });
    });
    describe("can be adjusted to fit a smaller bounding box", () => {
        const expectedSize = __1.Size3.givenWidthHeightDepth(5, 10, 7.5);
        const boundingBox = _1.Box3.givenCenterSize(__1.Point3.ofZero(), __1.Size3.givenWidthHeightDepth(10, 10, 10));
        const original = _1.Box3.givenCenterSize(__1.Point3.givenXYZ(100, 100, 100), __1.Size3.givenWidthHeightDepth(20, 40, 30));
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