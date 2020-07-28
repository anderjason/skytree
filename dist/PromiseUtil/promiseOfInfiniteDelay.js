"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.promiseOfInfiniteDelay = void 0;
const __1 = require("..");
function promiseOfInfiniteDelay() {
    // never resolves
    return new Promise(() => {
        // need to keep a setInterval in the event loop because
        // otherwise the process might eventually exit
        setInterval(Function.prototype, __1.Duration.givenMinutes(10).toMilliseconds()); // do nothing every 10 minutes
    });
}
exports.promiseOfInfiniteDelay = promiseOfInfiniteDelay;
//# sourceMappingURL=promiseOfInfiniteDelay.js.map