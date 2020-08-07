"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unionGivenSets = void 0;
function unionGivenSets(...sets) {
    if (!Array.isArray(sets)) {
        throw new Error("First argument should be an array");
    }
    const result = new Set();
    sets.forEach((set) => {
        set.forEach((v) => {
            result.add(v);
        });
    });
    return result;
}
exports.unionGivenSets = unionGivenSets;
//# sourceMappingURL=unionGivenSets.js.map