"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncSequenceGivenCountAndCallback = void 0;
async function asyncSequenceGivenCountAndCallback(times, fn) {
    if (times < 1) {
        return;
    }
    for (let index = 0; index < times; index++) {
        await fn(index);
    }
}
exports.asyncSequenceGivenCountAndCallback = asyncSequenceGivenCountAndCallback;
//# sourceMappingURL=asyncSequenceGivenCountAndCallback.js.map