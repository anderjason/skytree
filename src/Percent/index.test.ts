import { Test } from "../Test";
import { Percent } from ".";
import { Ratio } from "../Ratio";

Test.define("Percent can be created from a number", () => {
  const percent = Percent.givenNumber(50);
  Test.assert(percent.toString() === "50%");
});

Test.define("Percent can be created from a ratio", () => {
  const ratio = Ratio.givenDecimal(0.5);
  const percent = Percent.givenRatio(ratio);

  Test.assert(percent.toString() === "50%");
});

Test.define("Percent can be created from a string", () => {
  const percent = Percent.givenString("50%");

  Test.assert(percent.toString() === "50%");
});

Test.define("Percent can be converted to a ratio", () => {
  const percent = Percent.givenNumber(50);
  const ratio = percent.toRatio();

  Test.assert(ratio.toString() === "0.5");
});

Test.define("Percent can be converted to a number", () => {
  const percent = Percent.givenNumber(50);
  Test.assert(percent.toNumber() === 50);
});
