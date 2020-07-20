"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.promiseOfRepeatedActions = void 0;
async function promiseOfRepeatedActions(times, fn) {
    if (times < 1) {
        return;
    }
    for (let index = 0; index < times; index++) {
        await fn(index);
    }
}
exports.promiseOfRepeatedActions = promiseOfRepeatedActions;
//# sourceMappingURL=promiseOfRepeatedActions.js.map