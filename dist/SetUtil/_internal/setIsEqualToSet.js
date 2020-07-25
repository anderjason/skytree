"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setIsEqualToSet = void 0;
function setIsEqualToSet(firstSet, secondSet) {
    if (firstSet == null && secondSet == null) {
        return true;
    }
    if (firstSet == null || secondSet == null) {
        return false;
    }
    if (firstSet.size !== secondSet.size) {
        return false;
    }
    let allMatch = true;
    firstSet.forEach((value) => {
        if (!secondSet.has(value)) {
            allMatch = false;
        }
    });
    return allMatch;
}
exports.setIsEqualToSet = setIsEqualToSet;
//# sourceMappingURL=setIsEqualToSet.js.map