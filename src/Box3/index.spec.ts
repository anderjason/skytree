import "mocha";
import * as assert from "assert";
import { Box3 } from ".";
import { Point3, Size3 } from "..";

describe("Box3", () => {
  describe("can be created from a set of contained points", () => {
    const points = [
      Point3.givenXYZ(100, 100, 50),
      Point3.givenXYZ(300, 250, 500),
      Point3.givenXYZ(400, 300, 105),
      Point3.givenXYZ(50, 400, 250),
      Point3.givenXYZ(125, 70, 590),
    ];

    const actual = Box3.givenContainedPoints(points);
    const expected = Box3.givenOppositeCorners(
      Point3.givenXYZ(50, 70, 50),
      Point3.givenXYZ(400, 400, 590)
    );

    assert(actual.isEqual(expected));
  });

  describe("can be adjusted to fit a larger bounding box", () => {
    it("with left top front alignment", () => {
      const original = Box3.givenCenterSize(
        Point3.givenXYZ(100, 100, 100),
        Size3.givenWidthHeightDepth(20, 40, 30)
      );

      const availableSize = Size3.givenWidthHeightDepth(1000, 1000, 1000);

      const actual = original.withAvailableSize(
        availableSize,
        "flexible",
        "leftTopFront"
      );

      const expected = Box3.givenCenterSize(
        Point3.givenXYZ(100, 100, 100),
        Size3.givenWidthHeightDepth(500, 1000, 750)
      );

      assert.strictEqual(actual.left, original.left);
      assert.strictEqual(actual.top, original.top);
      assert.strictEqual(actual.front, original.front);
      assert(actual.size.isEqual(expected.size));
    });

    it("with center top front alignment", () => {
      const original = Box3.givenCenterSize(
        Point3.givenXYZ(100, 100, 100),
        Size3.givenWidthHeightDepth(20, 40, 30)
      );

      const availableSize = Size3.givenWidthHeightDepth(1000, 1000, 1000);

      const actual = original.withAvailableSize(
        availableSize,
        "flexible",
        "centerTopFront"
      );

      const expected = Box3.givenCenterSize(
        Point3.givenXYZ(100, 100, 100),
        Size3.givenWidthHeightDepth(500, 1000, 750)
      );

      assert.strictEqual(actual.center.x, original.center.x);
      assert.strictEqual(actual.top, original.top);
      assert.strictEqual(actual.front, original.front);
      assert(actual.size.isEqual(expected.size));
    });

    it("with right top front alignment", () => {
      const original = Box3.givenCenterSize(
        Point3.givenXYZ(100, 100, 100),
        Size3.givenWidthHeightDepth(20, 40, 30)
      );

      const availableSize = Size3.givenWidthHeightDepth(1000, 1000, 1000);

      const actual = original.withAvailableSize(
        availableSize,
        "flexible",
        "rightTopFront"
      );

      const expected = Box3.givenCenterSize(
        Point3.givenXYZ(100, 100, 100),
        Size3.givenWidthHeightDepth(500, 1000, 750)
      );

      assert.strictEqual(actual.right, original.right);
      assert.strictEqual(actual.top, original.top);
      assert.strictEqual(actual.front, original.front);
      assert(actual.size.isEqual(expected.size));
    });

    it("with left center front alignment", () => {
      const original = Box3.givenCenterSize(
        Point3.givenXYZ(100, 100, 100),
        Size3.givenWidthHeightDepth(20, 40, 30)
      );

      const availableSize = Size3.givenWidthHeightDepth(1000, 1000, 1000);

      const actual = original.withAvailableSize(
        availableSize,
        "flexible",
        "leftCenterFront"
      );

      const expected = Box3.givenCenterSize(
        Point3.givenXYZ(100, 100, 100),
        Size3.givenWidthHeightDepth(500, 1000, 750)
      );

      assert.strictEqual(actual.left, original.left);
      assert.strictEqual(actual.center.y, original.center.y);
      assert.strictEqual(actual.front, original.front);
      assert(actual.size.isEqual(expected.size));
    });

    it("with center front alignment", () => {
      const original = Box3.givenCenterSize(
        Point3.givenXYZ(100, 100, 100),
        Size3.givenWidthHeightDepth(20, 40, 30)
      );

      const availableSize = Size3.givenWidthHeightDepth(1000, 1000, 1000);

      const actual = original.withAvailableSize(
        availableSize,
        "flexible",
        "frontCenter"
      );

      const expected = Box3.givenCenterSize(
        Point3.givenXYZ(100, 100, 100),
        Size3.givenWidthHeightDepth(500, 1000, 750)
      );

      assert.strictEqual(actual.center.x, original.center.x);
      assert.strictEqual(actual.center.y, original.center.y);
      assert.strictEqual(actual.front, original.front);
      assert(actual.size.isEqual(expected.size));
    });

    it("with left bottom front alignment", () => {
      const original = Box3.givenCenterSize(
        Point3.givenXYZ(100, 100, 100),
        Size3.givenWidthHeightDepth(20, 40, 30)
      );

      const availableSize = Size3.givenWidthHeightDepth(1000, 1000, 1000);

      const actual = original.withAvailableSize(
        availableSize,
        "flexible",
        "leftBottomFront"
      );

      const expected = Box3.givenCenterSize(
        Point3.givenXYZ(100, 100, 100),
        Size3.givenWidthHeightDepth(500, 1000, 750)
      );

      assert.strictEqual(actual.left, original.left);
      assert.strictEqual(actual.bottom, original.bottom);
      assert.strictEqual(actual.front, original.front);
      assert(actual.size.isEqual(expected.size));
    });

    it("with center bottom front alignment", () => {
      const original = Box3.givenCenterSize(
        Point3.givenXYZ(100, 100, 100),
        Size3.givenWidthHeightDepth(20, 40, 30)
      );

      const availableSize = Size3.givenWidthHeightDepth(1000, 1000, 1000);

      const actual = original.withAvailableSize(
        availableSize,
        "flexible",
        "centerBottomFront"
      );

      const expected = Box3.givenCenterSize(
        Point3.givenXYZ(100, 100, 100),
        Size3.givenWidthHeightDepth(500, 1000, 750)
      );

      assert.strictEqual(actual.center.x, original.center.x);
      assert.strictEqual(actual.bottom, original.bottom);
      assert.strictEqual(actual.front, original.front);
      assert(actual.size.isEqual(expected.size));
    });

    it("with right center front alignment", () => {
      const original = Box3.givenCenterSize(
        Point3.givenXYZ(100, 100, 100),
        Size3.givenWidthHeightDepth(20, 40, 30)
      );

      const availableSize = Size3.givenWidthHeightDepth(1000, 1000, 1000);

      const actual = original.withAvailableSize(
        availableSize,
        "flexible",
        "rightCenterFront"
      );

      const expected = Box3.givenCenterSize(
        Point3.givenXYZ(100, 100, 100),
        Size3.givenWidthHeightDepth(500, 1000, 750)
      );

      assert.strictEqual(actual.right, original.right);
      assert.strictEqual(actual.center.y, original.center.y);
      assert.strictEqual(actual.front, original.front);
      assert(actual.size.isEqual(expected.size));
    });
  });
});
