"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.promiseOfFirstMatchingValue = void 0;
const promiseOfSequentialActions_1 = require("./promiseOfSequentialActions");
async function promiseOfFirstMatchingValue(input, fn) {
    let result = undefined;
    await promiseOfSequentialActions_1.promiseOfSequentialActions(input, (element) => {
        return fn(element).then((isMatch) => {
            if (isMatch == true && result == null) {
                result = element;
            }
        });
    });
    return result;
}
exports.promiseOfFirstMatchingValue = promiseOfFirstMatchingValue;
//# sourceMappingURL=promiseOfFirstMatchingValue.js.map