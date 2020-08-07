"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringOfRandomCharacters = void 0;
const defaultCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
function stringOfRandomCharacters(length, chars = defaultCharacters) {
    const result = [];
    const charactersLength = chars.length;
    for (let i = 0; i < length; i++) {
        result.push(chars.charAt(Math.floor(Math.random() * charactersLength)));
    }
    return result.join("");
}
exports.stringOfRandomCharacters = stringOfRandomCharacters;
//# sourceMappingURL=stringOfRandomCharacters.js.map