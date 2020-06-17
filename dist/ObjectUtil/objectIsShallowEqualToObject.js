"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.objectIsShallowEqualToObject = void 0;
function objectIsShallowEqualToObject(a, b) {
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
exports.objectIsShallowEqualToObject = objectIsShallowEqualToObject;
//# sourceMappingURL=objectIsShallowEqualToObject.js.map