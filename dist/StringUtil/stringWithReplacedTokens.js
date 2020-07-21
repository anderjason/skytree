"use strict";
/**
 * @author Jason Anderson <jason@gearsandwires.com>
 * @copyright 2016-2019 Gears & Wires
 * @license See vendor/wireframe/LICENSE file
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringWithReplacedTokens = void 0;
function stringWithReplacedTokens(input, variables, unmatchedTokenBehavior) {
    let result = input;
    Object.keys(variables).forEach((key) => {
        const value = variables[key];
        const regex = new RegExp(`{{\\s?${key}\\s?}}`, "g");
        result = result.replace(regex, value);
    });
    const hasUnmatchedTokens = /{{\s?\w+\s?}}/g.test(result);
    if (hasUnmatchedTokens == true) {
        switch (unmatchedTokenBehavior) {
            case "error":
                throw new Error("Template has unmatched tokens");
            case "remove":
                result = result.replace(/\s*{{\s?\w+\s?}}(\s?)\s*/g, "$1");
                break;
            case "ignore":
                break;
        }
    }
    return result;
}
exports.stringWithReplacedTokens = stringWithReplacedTokens;
//# sourceMappingURL=stringWithReplacedTokens.js.map