"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.promiseOfDelay = void 0;
function promiseOfDelay(duration) {
    return new Promise((resolve) => setTimeout(resolve, duration.toMilliseconds()));
}
exports.promiseOfDelay = promiseOfDelay;
//# sourceMappingURL=promiseOfDelay.js.map