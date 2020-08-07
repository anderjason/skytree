import { stringOfRandomCharacters } from "./stringOfRandomCharacters";
import { Test } from "../../Test";

Test.define(
  "stringOfRandomCharacters returns a string with the specified length",
  () => {
    const str = stringOfRandomCharacters(5);
    Test.assert(str.length === 5);
  }
);

Test.define(
  "stringOfRandomCharacters returns a different string each time",
  () => {
    const str1 = stringOfRandomCharacters(5);
    const str2 = stringOfRandomCharacters(5);
    const str3 = stringOfRandomCharacters(5);

    Test.assert(str1 !== str2);
    Test.assert(str1 !== str3);
    Test.assert(str2 !== str3);
  }
);
