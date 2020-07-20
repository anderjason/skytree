import { stringWithInitialCapital } from "./stringWithInitialCapital";
import { Test, assert } from "../Test";

Test.define("stringWithInitialCapital returns the expected results", () => {
  const beforeAfter = [
    ["hello world", "Hello world"],
    ["Hello world", "Hello world"],
    ["HELLO WORLD", "Hello world"],
    ["", ""],
  ];

  beforeAfter.forEach((pair) => {
    const actual = stringWithInitialCapital(pair[0]);
    const expected = pair[1];

    assert(actual === expected);
  });
});
