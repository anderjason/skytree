"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergedObjectGivenObjects = void 0;
const objectWithDeepMerge_1 = require("./objectWithDeepMerge");
function mergedObjectGivenObjects(objects, options) {
    if (!Array.isArray(objects)) {
        throw new Error("First argument should be an array");
    }
    return objects.reduce((prev, next) => {
        return objectWithDeepMerge_1.objectWithDeepMerge(prev, next, options);
    }, {});
}
exports.mergedObjectGivenObjects = mergedObjectGivenObjects;
//# sourceMappingURL=mergedObjectGivenObjects.js.map