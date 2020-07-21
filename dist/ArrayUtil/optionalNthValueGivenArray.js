"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.optionalNthValueGivenArray = void 0;
function optionalNthValueGivenArray(array, n) {
    if (array == null) {
        return undefined;
    }
    if (!Array.isArray(array)) {
        return undefined;
    }
    return n < array.length ? array[n] : undefined;
}
exports.optionalNthValueGivenArray = optionalNthValueGivenArray;
//# sourceMappingURL=optionalNthValueGivenArray.js.map