"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.objectIsEmpty = void 0;
function objectIsEmpty(input) {
    if (input == null) {
        return true;
    }
    if (typeof input !== "object") {
        throw new Error("input must be an object");
    }
    return Object.keys(input).length === 0;
}
exports.objectIsEmpty = objectIsEmpty;
//# sourceMappingURL=objectIsEmpty.js.map