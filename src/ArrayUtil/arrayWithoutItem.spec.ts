import "mocha";
import * as assert from "assert";
import { arrayWithoutItem } from "./arrayWithoutItem";

describe("arrayWithoutItem", () => {
  it("returns a new array with the specified item removed", () => {
    const first = { x: 1 };
    const second = { x: 2 };
    const third = { x: 3 };
    const fourth = { x: 4 };
    const items = [first, second, third, fourth];

    const result = arrayWithoutItem(items, third);

    assert(result.length === 3);
    assert(result[0] === first);
    assert(result[1] === second);
    assert(result[2] === fourth);
  });

  it("returns a new array even if the item is not found", () => {
    const first = { x: 1 };
    const second = { x: 2 };
    const third = { x: 3 };
    const items = [first, second];

    const result = arrayWithoutItem(items, third);

    assert(result !== items);
    assert(result.length === 2);
  });

  it("removes all instances of the item", () => {
    const first = { x: 1 };
    const second = { x: 2 };
    const third = { x: 3 };
    const items = [third, first, second, third];

    const result = arrayWithoutItem(items, third);

    assert(result.length === 2);
    assert(result[0] === first);
    assert(result[1] === second);
  });
});
