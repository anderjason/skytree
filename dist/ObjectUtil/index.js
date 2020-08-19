"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectUtil = void 0;
const objectIsDeepEqual_1 = require("./_internal/objectIsDeepEqual");
const objectIsEmpty_1 = require("./_internal/objectIsEmpty");
const objectIsShallowEqual_1 = require("./_internal/objectIsShallowEqual");
const objectWithDeepMerge_1 = require("./_internal/objectWithDeepMerge");
const objectWithoutBlankValues_1 = require("./_internal/objectWithoutBlankValues");
const objectWithValueAtPath_1 = require("./_internal/objectWithValueAtPath");
const unionGivenObjects_1 = require("./_internal/unionGivenObjects");
const optionalValueAtPathGivenObject_1 = require("./_internal/optionalValueAtPathGivenObject");
class ObjectUtil {
}
exports.ObjectUtil = ObjectUtil;
ObjectUtil.objectIsDeepEqual = objectIsDeepEqual_1.objectIsDeepEqual;
ObjectUtil.objectIsEmpty = objectIsEmpty_1.objectIsEmpty;
ObjectUtil.objectIsShallowEqual = objectIsShallowEqual_1.objectIsShallowEqual;
ObjectUtil.objectWithDeepMerge = objectWithDeepMerge_1.objectWithDeepMerge;
ObjectUtil.objectWithoutBlankValues = objectWithoutBlankValues_1.objectWithoutBlankValues;
ObjectUtil.objectWithValueAtPath = objectWithValueAtPath_1.objectWithValueAtPath;
ObjectUtil.unionGivenObjects = unionGivenObjects_1.unionGivenObjects;
ObjectUtil.optionalValueAtPathGivenObject = optionalValueAtPathGivenObject_1.optionalValueAtPathGivenObject;
//# sourceMappingURL=index.js.map