"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.valueAtPathGivenObject = void 0;
function valueAtPathGivenObject(object, path) {
    let index = 0;
    let length = path.length;
    while (object != null && index < length) {
        object = object[path[index++]];
    }
    return index && index == length ? object : undefined;
}
exports.valueAtPathGivenObject = valueAtPathGivenObject;
//# sourceMappingURL=valueAtPathGivenObject.js.map