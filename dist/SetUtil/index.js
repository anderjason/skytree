"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetUtil = void 0;
const setIsEqualToSet_1 = require("./_internal/setIsEqualToSet");
const intersectionGivenSets_1 = require("./_internal/intersectionGivenSets");
const setWithItem_1 = require("./_internal/setWithItem");
const setWithoutItem_1 = require("./_internal/setWithoutItem");
class SetUtil {
}
exports.SetUtil = SetUtil;
SetUtil.setIsEqual = setIsEqualToSet_1.setIsEqualToSet;
SetUtil.setIsEqualToSet = setIsEqualToSet_1.setIsEqualToSet; // deprecated
SetUtil.intersectionGivenSets = intersectionGivenSets_1.intersectionGivenSets;
SetUtil.setWithItem = setWithItem_1.setWithItem;
SetUtil.setWithoutItem = setWithoutItem_1.setWithoutItem;
//# sourceMappingURL=index.js.map