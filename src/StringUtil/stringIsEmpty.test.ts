import { stringIsEmpty } from "./stringIsEmpty";
import { Test, assert } from "../Test";

Test.define("stringIsEmpty returns true for null input", () => {
  assert(stringIsEmpty(null) === true);
});

Test.define("stringIsEmpty returns true for an empty string", () => {
  assert(stringIsEmpty("") === true);
});

Test.define(
  "stringIsEmpty returns false for a string with only whitespace",
  () => {
    assert(stringIsEmpty(" ") === false);
  }
);

Test.define("stringIsEmpty returns false for a string with characters", () => {
  assert(stringIsEmpty("abc") === false);
});
