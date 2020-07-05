import "mocha";
import * as assert from "assert";
import { stringWithInitialCapital } from "./stringWithInitialCapital";

describe("stringWithInitialCapital", () => {
  it("returns the expected results", () => {
    const beforeAfter = [
      ["hello world", "Hello world"],
      ["Hello world", "Hello world"],
      ["HELLO WORLD", "Hello world"],
      ["", ""],
    ];

    beforeAfter.forEach((pair) => {
      const actual = stringWithInitialCapital(pair[0]);
      const expected = pair[1];

      assert.strictEqual(actual, expected);
    });
  });
});
