"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.numberWithHardLimit = void 0;
function numberWithHardLimit(value, min, max) {
    return Math.min(Math.max(value, min), max);
}
exports.numberWithHardLimit = numberWithHardLimit;
//# sourceMappingURL=numberWithHardLimit.js.map