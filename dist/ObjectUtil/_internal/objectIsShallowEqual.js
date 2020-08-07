"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.objectIsShallowEqual = void 0;
function objectIsShallowEqual(a, b) {
    if (a == null && b == null) {
        return true;
    }
    if (a == null || b == null) {
        return false;
    }
    for (const key in a) {
        if (!(key in b) || a[key] !== b[key]) {
            return false;
        }
    }
    for (const key in b) {
        if (!(key in a) || a[key] !== b[key]) {
            return false;
        }
    }
    return true;
}
exports.objectIsShallowEqual = objectIsShallowEqual;
//# sourceMappingURL=objectIsShallowEqual.js.map