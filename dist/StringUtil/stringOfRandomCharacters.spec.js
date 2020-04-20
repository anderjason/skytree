"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const assert = require("assert");
const stringOfRandomCharacters_1 = require("./stringOfRandomCharacters");
describe("stringOfRandomCharacters", () => {
    it("returns a string with the specified length", () => {
        const str = stringOfRandomCharacters_1.stringOfRandomCharacters(5);
        assert(str.length === 5);
    });
    it("returns a different string each time", () => {
        const str1 = stringOfRandomCharacters_1.stringOfRandomCharacters(5);
        const str2 = stringOfRandomCharacters_1.stringOfRandomCharacters(5);
        const str3 = stringOfRandomCharacters_1.stringOfRandomCharacters(5);
        assert(str1 !== str2);
        assert(str1 !== str3);
        assert(str2 !== str3);
    });
});
//# sourceMappingURL=stringOfRandomCharacters.spec.js.map