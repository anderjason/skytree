import { stringWithCamelCase } from "./stringWithCamelCase";
import { Test, assert } from "../Test";

Test.define("stringWithCamelCase returns the expected results", () => {
  const beforeAfter = [
    ["hello world", "helloWorld"],
    ["hello  world", "helloWorld"],
    ["hello World", "helloWorld"],
    ["helloWorld", "helloWorld"],
    ["hello world with multiple words", "helloWorldWithMultipleWords"],
    ["hello", "hello"],
    ["HELLO WORLD", "helloWorld"],
    ["", ""],
    ["hello 1world", "hello1world"],
    ["hello 1 world", "hello1World"],
    ["1 world", "1World"],
    ["-", ""],
    ["hello-world", "helloWorld"],
    ["hello - world", "helloWorld"],
  ];

  beforeAfter.forEach((pair, idx) => {
    const actual = stringWithCamelCase(pair[0]);
    const expected = pair[1];

    if (actual !== expected) {
      console.log(`${idx} - Actual: '${actual}', expected: '${expected}'`);
    }

    assert(actual === expected);
  });
});
