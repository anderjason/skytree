"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const assert = require("assert");
const index_1 = require("./index");
const Point2_1 = require("../Point2");
describe("MutablePoint2", () => {
    it("can read values that were set in the constructor", () => {
        const mp = index_1.MutablePoint2.givenXY(5, 8);
        assert.strictEqual(mp.x, 5);
        assert.strictEqual(mp.y, 8);
    });
    it("can set values and read them back", () => {
        const mp = index_1.MutablePoint2.givenXY(5, 8);
        mp.x = 50;
        mp.y = 80;
        assert.strictEqual(mp.x, 50);
        assert.strictEqual(mp.y, 80);
    });
    it("can be used where a Point2 is expected", () => {
        const expectsPoint = (point) => {
            return point.x === 50 && point.y === 80;
        };
        const mp = index_1.MutablePoint2.givenXY(5, 8);
        mp.x = 50;
        mp.y = 80;
        assert(expectsPoint(mp));
    });
    it("can be checked for equality with another MutablePoint2", () => {
        const first = index_1.MutablePoint2.givenXY(5, 8);
        const second = index_1.MutablePoint2.givenXY(5, 8);
        assert(first.isEqual(second));
    });
    it("is not equal to a MutablePoint2 if the values are different", () => {
        const first = index_1.MutablePoint2.givenXY(5, 8);
        const second = index_1.MutablePoint2.givenXY(50, 80);
        assert(!first.isEqual(second));
    });
    it("can be checked for equality with a Point2", () => {
        const first = index_1.MutablePoint2.givenXY(5, 8);
        const second = Point2_1.Point2.givenXY(5, 8);
        assert(first.isEqual(second));
    });
    it("is not equal to a Point2 if the values are different", () => {
        const first = index_1.MutablePoint2.givenXY(5, 8);
        const second = Point2_1.Point2.givenXY(50, 80);
        assert(!first.isEqual(second));
    });
    it("is zero if the values are all zero", () => {
        const first = index_1.MutablePoint2.givenXY(0, 0);
        assert(first.isZero);
    });
    it("is not zero if any of the values are not zero", () => {
        assert(!index_1.MutablePoint2.givenXY(0, 1).isZero);
        assert(!index_1.MutablePoint2.givenXY(1, 0).isZero);
    });
    it("is not zero if the values are undefined", () => {
        assert(!index_1.MutablePoint2.givenXY(undefined, undefined).isZero);
    });
});
//# sourceMappingURL=index.spec.js.map