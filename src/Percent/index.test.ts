import { Test } from "../Test";
import { Percent } from ".";

Test.define("Percent can be created from a number", () => {
  const percent = Percent.givenFraction(50, 100);
  Test.assert(percent.toString() === "50%");
});

Test.define("Percent can be created from a string", () => {
  const percent = Percent.givenString("50%");

  Test.assert(percent.toString() === "50%");
});

Test.define("Percent can be converted to a number", () => {
  const percent = Percent.givenFraction(50, 100);
  Test.assert(percent.toNumber(100) === 50);
});
