import { stringWithInitialCapital } from "./stringWithInitialCapital";
import { Test } from "../../Test";

Test.define("stringWithInitialCapital returns the expected results", () => {
  const beforeAfter = [
    ["hello world", "Hello world"],
    ["Hello world", "Hello world"],
    ["HELLO WORLD", "HELLO WORLD"],
    ["h", "H"],
    ["", ""],
  ];

  beforeAfter.forEach((pair) => {
    const actual = stringWithInitialCapital(pair[0]);
    const expected = pair[1];

    Test.assert(actual === expected);
  });
});
