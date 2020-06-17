"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromiseUtil = void 0;
const promiseOfSequentialActions_1 = require("./promiseOfSequentialActions");
const promiseOfRepeatedActions_1 = require("./promiseOfRepeatedActions");
const promiseOfResults_1 = require("./promiseOfResults");
class PromiseUtil {
}
exports.PromiseUtil = PromiseUtil;
PromiseUtil.promiseOfSequentialActions = promiseOfSequentialActions_1.promiseOfSequentialActions;
PromiseUtil.promiseOfRepeatedActions = promiseOfRepeatedActions_1.promiseOfRepeatedActions;
PromiseUtil.promiseOfResults = promiseOfResults_1.promiseOfResults;
//# sourceMappingURL=index.js.map