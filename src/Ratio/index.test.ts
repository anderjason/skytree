import { Ratio } from ".";
import { Percent } from "../Percent";
import { Test, assert } from "../Test";

Test.define("Ratio can be created from a decimal", () => {
  const ratio = Ratio.givenDecimal(0.5);
  assert(ratio.toString() === "0.5");
});

Test.define("Ratio can be created from a fraction", () => {
  const ratio = Ratio.givenFraction(2, 10);
  assert(ratio.toString() === "0.2");
});

Test.define("Ratio can be created from a value and range", () => {
  const ratio = Ratio.givenValueAndRange(20, 0, 100);
  assert(ratio.toString() === "0.2");
});

Test.define("Ratio can be created from a percent", () => {
  const percent = Percent.givenNumber(50);
  const ratio = Ratio.givenPercent(percent);

  assert(ratio.toString() === "0.5");
});

Test.define("Ratio can be converted to a decimal number", () => {
  const ratio = Ratio.givenDecimal(0.5);
  assert(ratio.toDecimal() === 0.5);
});

Test.define("Ratio can be converted to a percent", () => {
  const ratio = Ratio.givenDecimal(0.5);
  const percent = ratio.toPercent();

  assert(percent.toString() === "50%");
});

Test.define("Ratio can be converted to a string", () => {
  const ratio = Ratio.givenDecimal(0.5);
  assert(ratio.toString() === "0.5");
});

Test.define("Ratio can be added to another ratio", () => {
  const ratio1 = Ratio.givenDecimal(0.5);
  const ratio2 = Ratio.givenDecimal(0.2);

  const result = ratio1.withAddedRatio(ratio2);
  assert(result.toDecimal() === 0.7);
});

Test.define("Ratio can be added to a decimal", () => {
  const ratio1 = Ratio.givenDecimal(0.5);

  const result = ratio1.withAddedDecimal(0.2);
  assert(result.toDecimal() === 0.7);
});

Test.define("Ratio can be multiplied by another ratio", () => {
  const ratio1 = Ratio.givenDecimal(0.5);
  const ratio2 = Ratio.givenDecimal(0.5);

  const result = ratio1.withMultipliedRatio(ratio2);
  assert(result.toDecimal() === 0.25);
});

Test.define("Ratio can be multiplied by a decimal", () => {
  const ratio1 = Ratio.givenDecimal(0.5);

  const result = ratio1.withMultipliedDecimal(0.5);
  assert(result.toDecimal() === 0.25);
});
