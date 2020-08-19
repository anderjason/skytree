"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncDelayOfForever = void 0;
const Duration_1 = require("../../Duration");
function asyncDelayOfForever() {
    // never resolves
    return new Promise(() => {
        // need to keep a setInterval in the event loop because
        // otherwise the process might eventually exit
        setInterval(Function.prototype, Duration_1.Duration.givenMinutes(10).toMilliseconds()); // do nothing every 10 minutes
    });
}
exports.asyncDelayOfForever = asyncDelayOfForever;
//# sourceMappingURL=asyncDelayOfForever.js.map