"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.promiseOfInfiniteDelay = void 0;
function promiseOfInfiniteDelay() {
    // never resolves
    return new Promise(() => {
        // need to keep a setInterval in the event loop because
        // otherwise the process might eventually exit
        const wait = () => {
            setInterval(wait, 100000);
        };
        wait();
    });
}
exports.promiseOfInfiniteDelay = promiseOfInfiniteDelay;
//# sourceMappingURL=promiseOfInfiniteDelay.js.map