"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.optionalIndexOfFirstMatchGivenArray = void 0;
function optionalIndexOfFirstMatchGivenArray(array, isMatch) {
    if (array == null) {
        return undefined;
    }
    if (array.length === 0) {
        return undefined;
    }
    if (!Array.isArray(array)) {
        throw new Error("Expected an array");
    }
    for (let i = 0; i < array.length; i++) {
        const value = array[i];
        if (isMatch(value)) {
            return i;
        }
    }
    return undefined;
}
exports.optionalIndexOfFirstMatchGivenArray = optionalIndexOfFirstMatchGivenArray;
//# sourceMappingURL=optionalIndexOfFirstMatchGivenArray.js.map