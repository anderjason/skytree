import "mocha";
import * as assert from "assert";
import { Ratio } from ".";
import { Percent } from "../Percent";

describe("Ratio", () => {
  it("can be created from a decimal", () => {
    const ratio = Ratio.ofDecimal(0.5);
    assert(ratio.toString() === "0.5");
  });

  it("can be created from a fraction", () => {
    const ratio = Ratio.ofFraction(2, 10);
    assert(ratio.toString() === "0.2");
  });

  it("can be created from a value and range", () => {
    const ratio = Ratio.ofValueAndRange(20, 0, 100);
    assert(ratio.toString() === "0.2");
  });

  it("can be created from a percent", () => {
    const percent = Percent.ofNumber(50);
    const ratio = Ratio.ofPercent(percent);

    assert(ratio.toString() === "0.5");
  });

  it("can be converted to a decimal number", () => {
    const ratio = Ratio.ofDecimal(0.5);
    assert(ratio.toDecimal() === 0.5);
  });

  it("can be converted to a percent", () => {
    const ratio = Ratio.ofDecimal(0.5);
    const percent = ratio.toPercent();

    assert(percent.toString() === "50%");
  });

  it("can be converted to a string", () => {
    const ratio = Ratio.ofDecimal(0.5);
    assert(ratio.toString() === "0.5");
  });

  it("can be added to another ratio", () => {
    const ratio1 = Ratio.ofDecimal(0.5);
    const ratio2 = Ratio.ofDecimal(0.2);

    const result = ratio1.withAddedRatio(ratio2);
    assert(result.toDecimal() === 0.7);
  });

  it("can be added to a decimal", () => {
    const ratio1 = Ratio.ofDecimal(0.5);

    const result = ratio1.withAddedDecimal(0.2);
    assert(result.toDecimal() === 0.7);
  });

  it("can be multiplied by another ratio", () => {
    const ratio1 = Ratio.ofDecimal(0.5);
    const ratio2 = Ratio.ofDecimal(0.5);

    const result = ratio1.withMultipliedRatio(ratio2);
    assert(result.toDecimal() === 0.25);
  });

  it("can be multiplied by a decimal", () => {
    const ratio1 = Ratio.ofDecimal(0.5);

    const result = ratio1.withMultipliedDecimal(0.5);
    assert(result.toDecimal() === 0.25);
  });
});
