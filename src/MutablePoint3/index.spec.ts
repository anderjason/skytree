import "mocha";
import * as assert from "assert";
import { MutablePoint3 } from "./index";
import { Point3 } from "../Point3";

describe("MutablePoint3", () => {
  it("can read values that were set in the constructor", () => {
    const mp = MutablePoint3.givenXYZ(5, 8, 4);
    assert.strictEqual(mp.x, 5);
    assert.strictEqual(mp.y, 8);
    assert.strictEqual(mp.z, 4);
  });

  it("can set values and read them back", () => {
    const mp = MutablePoint3.givenXYZ(5, 8, 4);
    mp.x = 50;
    mp.y = 80;
    mp.z = 40;

    assert.strictEqual(mp.x, 50);
    assert.strictEqual(mp.y, 80);
    assert.strictEqual(mp.z, 40);
  });

  it("can be used where a Point3 is expected", () => {
    const expectsPoint = (point: Point3): boolean => {
      return point.x === 50 && point.y === 80 && point.z === 40;
    };

    const mp = MutablePoint3.givenXYZ(5, 8, 4);
    mp.x = 50;
    mp.y = 80;
    mp.z = 40;

    assert(expectsPoint(mp));
  });

  it("can be checked for equality with another MutablePoint3", () => {
    const first = MutablePoint3.givenXYZ(5, 8, 4);
    const second = MutablePoint3.givenXYZ(5, 8, 4);

    assert(first.isEqual(second));
  });

  it("is not equal to a MutablePoint3 if the values are different", () => {
    const first = MutablePoint3.givenXYZ(5, 8, 4);
    const second = MutablePoint3.givenXYZ(50, 80, 40);

    assert(!first.isEqual(second));
  });

  it("can be checked for equality with a Point3", () => {
    const first = MutablePoint3.givenXYZ(5, 8, 4);
    const second = Point3.givenXYZ(5, 8, 4);

    assert(first.isEqual(second));
  });

  it("is not equal to a Point3 if the values are different", () => {
    const first = MutablePoint3.givenXYZ(5, 8, 4);
    const second = Point3.givenXYZ(50, 80, 40);

    assert(!first.isEqual(second));
  });

  it("is zero if the values are all zero", () => {
    const first = MutablePoint3.givenXYZ(0, 0, 0);

    assert(first.isZero);
  });

  it("is not zero if any of the values are not zero", () => {
    assert(!MutablePoint3.givenXYZ(0, 0, 1).isZero);
    assert(!MutablePoint3.givenXYZ(0, 1, 0).isZero);
    assert(!MutablePoint3.givenXYZ(1, 0, 0).isZero);
  });

  it("is not zero if the values are undefined", () => {
    assert(!MutablePoint3.givenXYZ(undefined, undefined, undefined).isZero);
  });
});
