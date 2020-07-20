"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringWithEachMatchReplaced = void 0;
async function stringWithEachMatchReplaced(input, regex, replace) {
    let result = input;
    let match = result.match(regex);
    while (match != null) {
        const replaceText = await replace(match);
        const index = match.index;
        if (index != null) {
            result =
                result.slice(0, index) +
                    replaceText +
                    result.slice(index + match[0].length);
        }
        match = result.match(regex);
    }
    return result;
}
exports.stringWithEachMatchReplaced = stringWithEachMatchReplaced;
//# sourceMappingURL=stringWithEachMatchReplaced.js.map