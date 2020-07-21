"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.valueAtPathGivenObject = void 0;
function valueAtPathGivenObject(object, valuePath) {
    if (object == null) {
        throw new Error("Object is required");
    }
    if (valuePath == null) {
        throw new Error("Value path is required");
    }
    let index = 0;
    let parts;
    if (Array.isArray(valuePath)) {
        parts = valuePath;
    }
    else {
        parts = valuePath.toParts();
    }
    let length = parts.length;
    while (object != null && index < length) {
        object = object[parts[index++]];
    }
    return index && index == length ? object : undefined;
}
exports.valueAtPathGivenObject = valueAtPathGivenObject;
//# sourceMappingURL=valueAtPathGivenObject.js.map