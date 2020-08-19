"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncSequenceGivenArrayAndCallback = void 0;
async function asyncSequenceGivenArrayAndCallback(array, fn) {
    if (array == null) {
        return;
    }
    const length = array.length;
    for (let index = 0; index < length; index++) {
        await fn(array[index], index, array);
    }
}
exports.asyncSequenceGivenArrayAndCallback = asyncSequenceGivenArrayAndCallback;
//# sourceMappingURL=asyncSequenceGivenArrayAndCallback.js.map