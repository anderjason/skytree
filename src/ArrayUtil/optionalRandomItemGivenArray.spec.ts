import "mocha";
import * as assert from "assert";
import { optionalRandomItemGivenArray } from "./optionalRandomItemGivenArray";

describe("optionalRandomItemGivenArray", () => {
  it("returns a random item from the array", () => {
    const first = "first";
    const second = "second";
    const third = "third";

    const items = [first, second, third];
    const result = optionalRandomItemGivenArray(items);

    assert(result != null);
    assert(result === first || result === second || result === third);
  });

  it("returns undefined if the array is empty", () => {
    const items: any[] = [];
    const result = optionalRandomItemGivenArray(items);

    assert(typeof result === "undefined");
  });
});
