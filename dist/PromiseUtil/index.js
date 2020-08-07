"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromiseUtil = void 0;
const promiseOfDelay_1 = require("./_internal/promiseOfDelay");
const promiseOfFirstMatchingValue_1 = require("./_internal/promiseOfFirstMatchingValue");
const promiseOfInfiniteDelay_1 = require("./_internal/promiseOfInfiniteDelay");
const promiseOfRepeatedActions_1 = require("./_internal/promiseOfRepeatedActions");
const promiseOfResults_1 = require("./_internal/promiseOfResults");
const promiseOfSequentialActions_1 = require("./_internal/promiseOfSequentialActions");
class PromiseUtil {
}
exports.PromiseUtil = PromiseUtil;
PromiseUtil.promiseOfDelay = promiseOfDelay_1.promiseOfDelay;
PromiseUtil.promiseOfFirstMatchingValue = promiseOfFirstMatchingValue_1.promiseOfFirstMatchingValue;
PromiseUtil.promiseOfInfiniteDelay = promiseOfInfiniteDelay_1.promiseOfInfiniteDelay;
PromiseUtil.promiseOfRepeatedActions = promiseOfRepeatedActions_1.promiseOfRepeatedActions;
PromiseUtil.promiseOfResults = promiseOfResults_1.promiseOfResults;
PromiseUtil.promiseOfSequentialActions = promiseOfSequentialActions_1.promiseOfSequentialActions;
//# sourceMappingURL=index.js.map