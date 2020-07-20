import { stringWithSnakeCase } from "./stringWithSnakeCase";
import { Test, assert } from "../Test";

Test.define("stringWithSnakeCase returns the expected results", () => {
  const beforeAfter = [
    ["hello world", "hello_world"],
    ["HELLO WORLD", "hello_world"],
    ["Hello World", "hello_world"],
    ["helloWorld", "hello_world"],
    ["hello_world", "hello_world"],
    ["hello-world", "hello_world"],
    ["HelloWorld", "hello_world"],
    ["hello__world", "hello_world"],
    ["", ""],
    ["1", "1"],
  ];

  beforeAfter.forEach((pair) => {
    const actual = stringWithSnakeCase(pair[0]);
    const expected = pair[1];

    assert(actual === expected);
  });
});
