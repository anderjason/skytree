import "mocha";
import * as assert from "assert";
import { numberWithDecimalPlaceLimit } from "./numberWithDecimalPlaceLimit";

describe("numberWithDecimalPlaceLimit", () => {
  it("trims digits from the end of a decimal number", () => {
    const input = 3.14159;
    assert(numberWithDecimalPlaceLimit(input, 2) === 3.14);
  });

  it("returns the original number if it has less than the requested number of decimal places", () => {
    const input = 3;
    assert(numberWithDecimalPlaceLimit(input, 2) === 3);
  });
});
