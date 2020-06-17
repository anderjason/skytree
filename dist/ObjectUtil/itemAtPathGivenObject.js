"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.itemAtPathGivenObject = void 0;
function itemAtPathGivenObject(object, path) {
    let index = 0;
    let length = path.length;
    while (object != null && index < length) {
        object = object[path[index++]];
    }
    return index && index == length ? object : undefined;
}
exports.itemAtPathGivenObject = itemAtPathGivenObject;
//# sourceMappingURL=itemAtPathGivenObject.js.map