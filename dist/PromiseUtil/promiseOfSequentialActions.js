"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.promiseOfSequentialActions = void 0;
async function promiseOfSequentialActions(array, fn) {
    if (array == null) {
        return;
    }
    const length = array.length;
    for (let index = 0; index < length; index++) {
        await fn(array[index], index, array);
    }
}
exports.promiseOfSequentialActions = promiseOfSequentialActions;
//# sourceMappingURL=promiseOfSequentialActions.js.map