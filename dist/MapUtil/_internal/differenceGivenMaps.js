"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.differenceGivenMaps = void 0;
function defaultIsValueEqual(thisValue, otherValue) {
    return thisValue === otherValue;
}
function differenceGivenMaps(thisMap, otherMap, isValueEqual = defaultIsValueEqual) {
    const addedItems = [];
    const changedItems = [];
    const removedItems = [];
    const allKeys = new Set();
    for (const key of thisMap.keys()) {
        allKeys.add(key);
    }
    for (const key of otherMap.keys()) {
        allKeys.add(key);
    }
    allKeys.forEach((key) => {
        const thisValue = thisMap.get(key);
        const otherValue = otherMap.get(key);
        if (thisValue == null && otherValue == null) {
            return;
        }
        else if (otherValue == null) {
            removedItems.push({
                key,
                oldValue: thisValue,
            });
        }
        else if (thisValue == null) {
            addedItems.push({
                key,
                newValue: otherValue,
            });
        }
        else {
            if (!isValueEqual(thisValue, otherValue)) {
                changedItems.push({
                    key,
                    oldValue: thisValue,
                    newValue: otherValue,
                });
            }
        }
    });
    return {
        addedItems,
        changedItems,
        removedItems,
        isEqual: addedItems.length === 0 &&
            changedItems.length === 0 &&
            removedItems.length === 0,
    };
}
exports.differenceGivenMaps = differenceGivenMaps;
//# sourceMappingURL=differenceGivenMaps.js.map