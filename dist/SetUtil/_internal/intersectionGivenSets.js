"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.intersectionGivenSets = void 0;
const ArrayUtil_1 = require("../../ArrayUtil");
function intersectionGivenSets(sets) {
    if (sets == null) {
        throw new Error("Sets are required");
    }
    if (sets.length === 0) {
        return new Set();
    }
    if (sets.length === 1) {
        return new Set(sets[0]);
    }
    const result = new Set();
    const smallestSet = ArrayUtil_1.ArrayUtil.arrayWithOrderFromValue(sets, (s) => s.size, "ascending")[0];
    const otherSets = ArrayUtil_1.ArrayUtil.arrayWithoutValue(sets, smallestSet);
    smallestSet.forEach((item) => {
        if (otherSets.every((otherSet) => otherSet.has(item))) {
            result.add(item);
        }
    });
    return result;
}
exports.intersectionGivenSets = intersectionGivenSets;
//# sourceMappingURL=intersectionGivenSets.js.map