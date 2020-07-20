import { Test, assert } from "../Test";
import { optionalRandomValueGivenArray } from "./optionalRandomValueGivenArray";

Test.define(
  "optionalRandomItemGivenArray returns a random item from the array",
  () => {
    const first = "first";
    const second = "second";
    const third = "third";

    const items = [first, second, third];
    const result = optionalRandomValueGivenArray(items);

    assert(result != null);
    assert(result === first || result === second || result === third);
  }
);

Test.define("returns undefined if the array is empty", () => {
  const items: any[] = [];
  const result = optionalRandomValueGivenArray(items);

  assert(typeof result === "undefined");
});
