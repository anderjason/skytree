import "mocha";
import * as assert from "assert";
import { Percent } from ".";
import { Ratio } from "../Ratio";

describe("Percent", () => {
  it("can be created from a number", () => {
    const percent = Percent.ofNumber(50);
    assert(percent.toString() === "50%");
  });

  it("can be created from a ratio", () => {
    const ratio = Ratio.ofDecimal(0.5);
    const percent = Percent.ofRatio(ratio);

    assert(percent.toString() === "50%");
  });

  it("can be created from a string", () => {
    const percent = Percent.ofString("50%");

    assert(percent.toString() === "50%");
  });

  it("can be converted to a ratio", () => {
    const percent = Percent.ofNumber(50);
    const ratio = percent.toRatio();

    assert(ratio.toString() === "0.5");
  });

  it("can be converted to a number", () => {
    const percent = Percent.ofNumber(50);
    assert(percent.toNumber() === 50);
  });
});
