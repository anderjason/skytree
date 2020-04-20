import "mocha";
import * as assert from "assert";
import { stringIsEmpty } from "./stringIsEmpty";

describe("stringIsEmpty", () => {
  it("returns true for null input", () => {
    assert(stringIsEmpty(null) === true);
  });

  it("returns true for an empty string", () => {
    assert(stringIsEmpty("") === true);
  });

  it("returns false for a string with only whitespace", () => {
    assert(stringIsEmpty(" ") === false);
  });

  it("returns false for a string with characters", () => {
    assert(stringIsEmpty("abc") === false);
  });
});
