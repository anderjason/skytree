import { Test } from "../../Test";
import { optionalRandomValueGivenArray } from "./optionalRandomValueGivenArray";

Test.define(
  "optionalRandomItemGivenArray returns a random item from the array",
  () => {
    const first = "first";
    const second = "second";
    const third = "third";

    const items = [first, second, third];
    const result = optionalRandomValueGivenArray(items);

    Test.assert(result != null);
    Test.assert(result === first || result === second || result === third);
  }
);

Test.define(
  "optionalRandomValueGivenArray returns undefined if the array is empty",
  () => {
    const items: any[] = [];
    const result = optionalRandomValueGivenArray(items);

    Test.assert(typeof result === "undefined");
  }
);
