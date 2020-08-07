"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.differenceGivenSets = void 0;
function defaultIsValueEqual(thisValue, otherValue) {
    return thisValue === otherValue;
}
function differenceGivenSets(thisSet, otherSet, isValueEqual = defaultIsValueEqual) {
    const removedItems = [];
    let isEqual = true;
    const otherSetCopy = new Set(otherSet);
    thisSet.forEach((v) => {
        if (v == null) {
            return;
        }
        otherSetCopy.delete(v);
        if (!otherSet.has(v)) {
            removedItems.push(v);
            isEqual = false;
        }
    });
    return {
        addedItems: Array.from(otherSetCopy),
        removedItems,
        isEqual,
    };
}
exports.differenceGivenSets = differenceGivenSets;
//# sourceMappingURL=differenceGivenSets.js.map