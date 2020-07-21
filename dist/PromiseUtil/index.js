"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromiseUtil = void 0;
const promiseOfSequentialActions_1 = require("./promiseOfSequentialActions");
const promiseOfRepeatedActions_1 = require("./promiseOfRepeatedActions");
const promiseOfResults_1 = require("./promiseOfResults");
const promiseOfInfiniteDelay_1 = require("./promiseOfInfiniteDelay");
const promiseOfFirstMatchingValue_1 = require("./promiseOfFirstMatchingValue");
class PromiseUtil {
}
exports.PromiseUtil = PromiseUtil;
PromiseUtil.promiseOfSequentialActions = promiseOfSequentialActions_1.promiseOfSequentialActions;
PromiseUtil.promiseOfRepeatedActions = promiseOfRepeatedActions_1.promiseOfRepeatedActions;
PromiseUtil.promiseOfResults = promiseOfResults_1.promiseOfResults;
PromiseUtil.promiseOfInfiniteDelay = promiseOfInfiniteDelay_1.promiseOfInfiniteDelay;
PromiseUtil.promiseOfFirstMatchingValue = promiseOfFirstMatchingValue_1.promiseOfFirstMatchingValue;
//# sourceMappingURL=index.js.map