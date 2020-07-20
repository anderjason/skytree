import { Test, assert } from "../Test";
import { Size2 } from ".";

Test.define("Size2 can be adjusted to fit a larger bounding box", () => {
  const original = Size2.givenWidthHeight(100, 200);
  const bounds = Size2.givenWidthHeight(1000, 1000);

  const actual = original.withAvailableSize(bounds, "flexible");
  const expected = Size2.givenWidthHeight(500, 1000);

  assert(actual.isEqual(expected));
});

Test.define("Size2 can be adjusted to fit a smaller bounding box", () => {
  const original = Size2.givenWidthHeight(100, 200);
  const bounds = Size2.givenWidthHeight(10, 10);

  const actual = original.withAvailableSize(bounds, "flexible");
  const expected = Size2.givenWidthHeight(5, 10);

  assert(actual.isEqual(expected));
});

Test.define(
  "Size2 can be adjusted to fit a larger bounding box without expanding",
  () => {
    const original = Size2.givenWidthHeight(100, 200);
    const bounds = Size2.givenWidthHeight(1000, 1000);

    const actual = original.withAvailableSize(bounds, "shrink");
    const expected = Size2.givenWidthHeight(100, 200);

    assert(actual.isEqual(expected));
  }
);

Test.define("Size2 can be adjusted to fit a zero size bounding box", () => {
  const original = Size2.givenWidthHeight(100, 200);
  const bounds = Size2.givenWidthHeight(0, 0);

  const actual = original.withAvailableSize(bounds, "flexible");
  const expected = Size2.ofZero();

  assert(actual.isEqual(expected));
});
