import { stringIsEmpty } from "./stringIsEmpty";
import { Test } from "../../Test";

Test.define("stringIsEmpty returns true for null input", () => {
  Test.assert(stringIsEmpty(null) === true);
});

Test.define("stringIsEmpty returns true for an empty string", () => {
  Test.assert(stringIsEmpty("") === true);
});

Test.define(
  "stringIsEmpty returns false for a string with only whitespace",
  () => {
    Test.assert(stringIsEmpty(" ") === false);
  }
);

Test.define("stringIsEmpty returns false for a string with characters", () => {
  Test.assert(stringIsEmpty("abc") === false);
});
