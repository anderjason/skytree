"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unionGivenMaps = void 0;
function unionGivenMaps(...iterables) {
    const result = new Map();
    for (let iterable of iterables) {
        for (let item of iterable) {
            const [key, val] = item;
            result.set(key, val);
        }
    }
    return result;
}
exports.unionGivenMaps = unionGivenMaps;
//# sourceMappingURL=unionGivenMaps.js.map