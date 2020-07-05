import "mocha";
import * as assert from "assert";
import { stringWithPascalCase } from "./stringWithPascalCase";

describe("stringWithPascalCase", () => {
  it("returns the expected results", () => {
    const beforeAfter = [
      ["hello world", "HelloWorld"],
      ["hello  world", "HelloWorld"],
      ["hello World", "HelloWorld"],
      ["helloWorld", "HelloWorld"],
      ["hello", "Hello"],
      ["HELLO WORLD", "HelloWorld"],
      ["", ""],
      ["hello 1world", "Hello1world"],
      ["hello 1 world", "Hello1World"],
      ["1 world", "1World"],
      ["-", ""],
      ["hello-world", "HelloWorld"],
      ["hello - world", "HelloWorld"],
    ];

    beforeAfter.forEach((pair) => {
      const actual = stringWithPascalCase(pair[0]);
      const expected = pair[1];

      assert.strictEqual(actual, expected);
    });
  });
});
