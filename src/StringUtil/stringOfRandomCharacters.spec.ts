import "mocha";
import * as assert from "assert";
import { stringOfRandomCharacters } from "./stringOfRandomCharacters";

describe("stringOfRandomCharacters", () => {
  it("returns a string with the specified length", () => {
    const str = stringOfRandomCharacters(5);
    assert(str.length === 5);
  });

  it("returns a different string each time", () => {
    const str1 = stringOfRandomCharacters(5);
    const str2 = stringOfRandomCharacters(5);
    const str3 = stringOfRandomCharacters(5);

    assert(str1 !== str2);
    assert(str1 !== str3);
    assert(str2 !== str3);
  });
});
