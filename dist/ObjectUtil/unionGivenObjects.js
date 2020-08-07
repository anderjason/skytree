"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unionGivenObjects = void 0;
const objectWithDeepMerge_1 = require("./objectWithDeepMerge");
function unionGivenObjects(...objects) {
    return objects.reduce((prev, next) => {
        return objectWithDeepMerge_1.objectWithDeepMerge(prev, next);
    }, {});
}
exports.unionGivenObjects = unionGivenObjects;
//# sourceMappingURL=unionGivenObjects.js.map