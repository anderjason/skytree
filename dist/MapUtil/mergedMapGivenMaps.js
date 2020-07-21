"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergedMapGivenMaps = void 0;
function mergedMapGivenMaps(...iterables) {
    const result = new Map();
    for (let iterable of iterables) {
        for (let item of iterable) {
            const [key, val] = item;
            result.set(key, val);
        }
    }
    return result;
}
exports.mergedMapGivenMaps = mergedMapGivenMaps;
//# sourceMappingURL=mergedMapGivenMaps.js.map