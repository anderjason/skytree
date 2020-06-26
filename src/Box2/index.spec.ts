import "mocha";
import * as assert from "assert";
import { Box2, Anchor2 } from ".";
import { Point2, Size2 } from "..";

const anchors: Anchor2[] = [
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
      Point2.givenXY(100, 100),
      Point2.givenXY(300, 250),
      Point2.givenXY(400, 300),
      Point2.givenXY(50, 400),
      Point2.givenXY(125, 70),
    ];

    const actual = Box2.givenContainedPoints(points);
    const expected = Box2.givenOppositeCorners(
      Point2.givenXY(50, 70),
      Point2.givenXY(400, 400)
    );

    assert(actual.isEqual(expected));
  });

  describe("can be adjusted to fit a larger bounding box", () => {
    const expectedSize = Size2.givenWidthHeight(500, 1000);

    const boundingBox = Box2.givenTopLeftSize(
      Point2.ofZero(),
      Size2.givenWidthHeight(1000, 1000)
    );

    const original = Box2.givenCenterSize(
      Point2.givenXY(100, 100),
      Size2.givenWidthHeight(20, 40)
    );

    it("with all anchors", () => {
      anchors.forEach((anchor) => {
        const actual = original.withBoundingBox(
          boundingBox,
          "flexible",
          anchor
        );

        assert(
          actual[anchor].isEqual(boundingBox[anchor]),
          `Anchor ${anchor} box does not match`
        );
        assert(actual.size.isEqual(expectedSize));
      });
    });
  });

  describe("can be adjusted to fit a smaller bounding box", () => {
    const original = Box2.givenCenterSize(
      Point2.givenXY(100, 100),
      Size2.givenWidthHeight(20, 40)
    );

    const expectedSize = Size2.givenWidthHeight(5, 10);

    const boundingBox = Box2.givenTopLeftSize(
      Point2.ofZero(),
      Size2.givenWidthHeight(10, 10)
    );

    it("with all anchors", () => {
      anchors.forEach((anchor) => {
        const actual = original.withBoundingBox(
          boundingBox,
          "flexible",
          anchor
        );

        assert(
          actual[anchor].isEqual(boundingBox[anchor]),
          `Anchor ${anchor} box does not match`
        );
        assert(actual.size.isEqual(expectedSize));
      });
    });
  });
});
