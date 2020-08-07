"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetUtil = void 0;
const setIsEqual_1 = require("./_internal/setIsEqual");
const intersectionGivenSets_1 = require("./_internal/intersectionGivenSets");
const setWithItem_1 = require("./_internal/setWithItem");
const setWithoutItem_1 = require("./_internal/setWithoutItem");
const differenceGivenSets_1 = require("./_internal/differenceGivenSets");
const unionGivenSets_1 = require("./_internal/unionGivenSets");
class SetUtil {
}
exports.SetUtil = SetUtil;
SetUtil.setIsEqual = setIsEqual_1.setIsEqual;
SetUtil.intersectionGivenSets = intersectionGivenSets_1.intersectionGivenSets;
SetUtil.differenceGivenSets = differenceGivenSets_1.differenceGivenSets;
SetUtil.unionGivenSets = unionGivenSets_1.unionGivenSets;
SetUtil.setWithItem = setWithItem_1.setWithItem;
SetUtil.setWithoutItem = setWithoutItem_1.setWithoutItem;
//# sourceMappingURL=index.js.map