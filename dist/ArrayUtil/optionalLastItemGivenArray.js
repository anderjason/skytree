"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.optionalLastItemGivenArray = void 0;
function optionalLastItemGivenArray(array) {
    if (array == null) {
        return undefined;
    }
    if (!Array.isArray(array)) {
        return undefined;
    }
    if (array.length === 0) {
        return undefined;
    }
    return array[array.length - 1];
}
exports.optionalLastItemGivenArray = optionalLastItemGivenArray;
//# sourceMappingURL=optionalLastItemGivenArray.js.map