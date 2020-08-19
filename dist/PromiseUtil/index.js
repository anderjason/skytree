"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromiseUtil = void 0;
const asyncDelayGivenDuration_1 = require("./_internal/asyncDelayGivenDuration");
const asyncDelayOfForever_1 = require("./_internal/asyncDelayOfForever");
const asyncLargeSequenceGivenDefinition_1 = require("./_internal/asyncLargeSequenceGivenDefinition");
const asyncSequenceGivenArrayAndCallback_1 = require("./_internal/asyncSequenceGivenArrayAndCallback");
const asyncSequenceGivenCountAndCallback_1 = require("./_internal/asyncSequenceGivenCountAndCallback");
const asyncValueGivenArrayAndFilter_1 = require("./_internal/asyncValueGivenArrayAndFilter");
const asyncValuesGivenArrayAndConverter_1 = require("./_internal/asyncValuesGivenArrayAndConverter");
class PromiseUtil {
}
exports.PromiseUtil = PromiseUtil;
PromiseUtil.asyncDelayGivenDuration = asyncDelayGivenDuration_1.asyncDelayGivenDuration;
PromiseUtil.asyncDelayOfForever = asyncDelayOfForever_1.asyncDelayOfForever;
PromiseUtil.asyncLargeSequenceGivenDefinition = asyncLargeSequenceGivenDefinition_1.asyncLargeSequenceGivenDefinition;
PromiseUtil.asyncSequenceGivenArrayAndCallback = asyncSequenceGivenArrayAndCallback_1.asyncSequenceGivenArrayAndCallback;
PromiseUtil.asyncSequenceGivenCountAndCallback = asyncSequenceGivenCountAndCallback_1.asyncSequenceGivenCountAndCallback;
PromiseUtil.asyncValueGivenArrayAndFilter = asyncValueGivenArrayAndFilter_1.asyncValueGivenArrayAndFilter;
PromiseUtil.asyncValuesGivenArrayAndConverter = asyncValuesGivenArrayAndConverter_1.asyncValuesGivenArrayAndConverter;
//# sourceMappingURL=index.js.map