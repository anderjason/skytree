import { numberWithRangeMap } from "./numberWithRangeMap";
import { Test, assert } from "../Test";

Test.define(
  "numberWithRangeMap adjusts a number from the input range to the corresponding point in the output range",
  () => {
    const input = 5;

    assert(numberWithRangeMap(input, 0, 10, 0, 100) === 50);
    assert(numberWithRangeMap(input, 0, 5, 0, 100) === 100);
  }
);

Test.define(
  "numberWithRangeMap clips values to the input range before scaling",
  () => {
    const input = 5;

    assert(numberWithRangeMap(input, 0, 1, 0, 100) === 100);
    assert(numberWithRangeMap(input, 10, 100, 0, 100) === 0);
  }
);
