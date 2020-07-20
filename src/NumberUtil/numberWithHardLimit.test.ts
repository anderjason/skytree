import { numberWithHardLimit } from "./numberWithHardLimit";
import { Test, assert } from "../Test";

Test.define(
  "numberWithHardLimit limits a number to the specified range",
  () => {
    const input = 5;

    assert(numberWithHardLimit(input, 1, 3) === 3);
    assert(numberWithHardLimit(input, 1, 10) === 5);
    assert(numberWithHardLimit(input, 10, 30) === 10);
  }
);
