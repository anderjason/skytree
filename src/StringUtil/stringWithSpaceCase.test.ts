import { stringWithSpaceCase } from "./stringWithSpaceCase";
import { Test, assert } from "../Test";

Test.define("stringWithSpaceCase returns the expected results", () => {
  const beforeAfter = [
    ["hello world", "hello world"],
    ["HELLO WORLD", "hello world"],
    ["hello   world", "hello world"],
    ["Hello World", "hello world"],
    ["helloWorld", "hello world"],
    ["hello_world", "hello world"],
    ["hello-world", "hello world"],
    ["HelloWorld", "hello world"],
    ["", ""],
    [" ", ""],
    ["-", ""],
    ["1", "1"],
  ];

  beforeAfter.forEach((pair, idx) => {
    const actual = stringWithSpaceCase(pair[0]);
    const expected = pair[1];

    if (actual !== expected) {
      console.log(`${idx} - Actual: '${actual}', expected: '${expected}'`);
    }

    assert(actual === expected);
  });
});
