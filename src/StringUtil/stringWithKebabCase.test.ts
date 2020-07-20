import { stringWithKebabCase } from "./stringWithKebabCase";
import { Test, assert } from "../Test";

Test.define("stringWithKebabCase returns the expected results", () => {
  const beforeAfter = [
    ["hello world", "hello-world"],
    ["HELLO WORLD", "hello-world"],
    ["Hello World", "hello-world"],
    ["helloWorld", "hello-world"],
    ["hello_world", "hello-world"],
    ["hello-world", "hello-world"],
    ["HelloWorld", "hello-world"],
    ["hello__world", "hello-world"],
    ["hello--world", "hello-world"],
    ["", ""],
    ["1", "1"],
  ];

  beforeAfter.forEach((pair) => {
    const actual = stringWithKebabCase(pair[0]);
    const expected = pair[1];

    assert(actual === expected);
  });
});
