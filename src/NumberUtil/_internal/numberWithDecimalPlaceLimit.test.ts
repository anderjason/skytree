import { numberWithDecimalPlaceLimit } from "./numberWithDecimalPlaceLimit";
import { Test } from "../../Test";

Test.define(
  "numberWithDecimalPlaceLimit trims digits from the end of a decimal number",
  () => {
    const input = 3.14159;
    Test.assert(numberWithDecimalPlaceLimit(input, 2) === 3.14);
  }
);

Test.define(
  "numberWithDecimalPlaceLimit returns the original number if it has less than the requested number of decimal places",
  () => {
    const input = 3;
    Test.assert(numberWithDecimalPlaceLimit(input, 2) === 3);
  }
);
