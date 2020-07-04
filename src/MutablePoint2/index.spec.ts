import "mocha";
import * as assert from "assert";
import { MutablePoint2 } from "./index";
import { Point2 } from "../Point2";

describe("MutablePoint2", () => {
  it("can read values that were set in the constructor", () => {
    const mp = MutablePoint2.givenXY(5, 8);
    assert.strictEqual(mp.x, 5);
    assert.strictEqual(mp.y, 8);
  });

  it("can set values and read them back", () => {
    const mp = MutablePoint2.givenXY(5, 8);
    mp.x = 50;
    mp.y = 80;

    assert.strictEqual(mp.x, 50);
    assert.strictEqual(mp.y, 80);
  });

  it("can be used where a Point2 is expected", () => {
    const expectsPoint = (point: Point2): boolean => {
      return point.x === 50 && point.y === 80;
    };

    const mp = MutablePoint2.givenXY(5, 8);
    mp.x = 50;
    mp.y = 80;

    assert(expectsPoint(mp));
  });

  it("can be checked for equality with another MutablePoint2", () => {
    const first = MutablePoint2.givenXY(5, 8);
    const second = MutablePoint2.givenXY(5, 8);

    assert(first.isEqual(second));
  });

  it("is not equal to a MutablePoint2 if the values are different", () => {
    const first = MutablePoint2.givenXY(5, 8);
    const second = MutablePoint2.givenXY(50, 80);

    assert(!first.isEqual(second));
  });

  it("can be checked for equality with a Point2", () => {
    const first = MutablePoint2.givenXY(5, 8);
    const second = Point2.givenXY(5, 8);

    assert(first.isEqual(second));
  });

  it("is not equal to a Point2 if the values are different", () => {
    const first = MutablePoint2.givenXY(5, 8);
    const second = Point2.givenXY(50, 80);

    assert(!first.isEqual(second));
  });

  it("is zero if the values are all zero", () => {
    const first = MutablePoint2.givenXY(0, 0);

    assert(first.isZero);
  });

  it("is not zero if any of the values are not zero", () => {
    assert(!MutablePoint2.givenXY(0, 1).isZero);
    assert(!MutablePoint2.givenXY(1, 0).isZero);
  });

  it("is not zero if the values are undefined", () => {
    assert(!MutablePoint2.givenXY(undefined, undefined).isZero);
  });
});
