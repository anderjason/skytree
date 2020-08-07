"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setIsEqual = void 0;
function setIsEqual(firstSet, secondSet) {
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
exports.setIsEqual = setIsEqual;
//# sourceMappingURL=setIsEqual.js.map