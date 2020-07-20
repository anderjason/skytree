import { stringOfRandomCharacters } from "./stringOfRandomCharacters";
import { Test, assert } from "../Test";

Test.define(
  "stringOfRandomCharacters returns a string with the specified length",
  () => {
    const str = stringOfRandomCharacters(5);
    assert(str.length === 5);
  }
);

Test.define(
  "stringOfRandomCharacters returns a different string each time",
  () => {
    const str1 = stringOfRandomCharacters(5);
    const str2 = stringOfRandomCharacters(5);
    const str3 = stringOfRandomCharacters(5);

    assert(str1 !== str2);
    assert(str1 !== str3);
    assert(str2 !== str3);
  }
);
