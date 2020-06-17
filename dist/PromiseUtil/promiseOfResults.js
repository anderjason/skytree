"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.promiseOfResults = void 0;
const promiseOfSequentialActions_1 = require("./promiseOfSequentialActions");
function promiseOfResults(input, fn) {
    const result = [];
    return promiseOfSequentialActions_1.promiseOfSequentialActions(input, (element, idx) => {
        return fn(element, idx).then((elementResult) => {
            result.push(elementResult);
        });
    }).then(() => {
        return result;
    });
}
exports.promiseOfResults = promiseOfResults;
//# sourceMappingURL=promiseOfResults.js.map