"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.objectWithValueAtPath = void 0;
function objectWithValueAtPath(object, path, value) {
    let index = 0;
    let length = path.length;
    // shallow clone
    let result;
    if (Array.isArray(object)) {
        result = [...object];
    }
    else {
        result = Object.assign({}, object);
    }
    // mutate the clone
    let pointer = result;
    while (pointer != null && index < length - 1) {
        let key = path[index];
        if (Array.isArray(pointer[key])) {
            pointer[key] = [...pointer[key]];
        }
        else {
            pointer[key] = Object.assign({}, pointer[key]);
        }
        pointer = pointer[key];
        index += 1;
    }
    if (pointer != null) {
        pointer[path[index]] = value;
    }
    return result;
}
exports.objectWithValueAtPath = objectWithValueAtPath;
//# sourceMappingURL=objectWithValueAtPath.js.map