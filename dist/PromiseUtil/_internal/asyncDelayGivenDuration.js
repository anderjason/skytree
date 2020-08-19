"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncDelayGivenDuration = void 0;
function asyncDelayGivenDuration(duration) {
    return new Promise((resolve) => setTimeout(resolve, duration.toMilliseconds()));
}
exports.asyncDelayGivenDuration = asyncDelayGivenDuration;
//# sourceMappingURL=asyncDelayGivenDuration.js.map