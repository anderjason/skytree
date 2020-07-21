"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectUtil = void 0;
const valueAtPathGivenObject_1 = require("./valueAtPathGivenObject");
const mergedObjectGivenObjects_1 = require("./mergedObjectGivenObjects");
const objectGivenQueryString_1 = require("./objectGivenQueryString");
const objectIsDeepEqualToObject_1 = require("./objectIsDeepEqualToObject");
const objectIsEmpty_1 = require("./objectIsEmpty");
const objectIsShallowEqualToObject_1 = require("./objectIsShallowEqualToObject");
const objectWithDeepMerge_1 = require("./objectWithDeepMerge");
const objectWithoutBlankValues_1 = require("./objectWithoutBlankValues");
const objectWithValueAtPath_1 = require("./objectWithValueAtPath");
const queryStringGivenObject_1 = require("./queryStringGivenObject");
class ObjectUtil {
}
exports.ObjectUtil = ObjectUtil;
ObjectUtil.mergedObjectGivenObjects = mergedObjectGivenObjects_1.mergedObjectGivenObjects;
ObjectUtil.objectGivenQueryString = objectGivenQueryString_1.objectGivenQueryString;
ObjectUtil.objectIsDeepEqual = objectIsDeepEqualToObject_1.objectIsDeepEqualToObject;
ObjectUtil.objectIsDeepEqualToObject = objectIsDeepEqualToObject_1.objectIsDeepEqualToObject; // deprecated
ObjectUtil.objectIsEmpty = objectIsEmpty_1.objectIsEmpty;
ObjectUtil.objectIsShallowEqual = objectIsShallowEqualToObject_1.objectIsShallowEqualToObject;
ObjectUtil.objectIsShallowEqualToObject = objectIsShallowEqualToObject_1.objectIsShallowEqualToObject; // deprecated
ObjectUtil.objectWithDeepMerge = objectWithDeepMerge_1.objectWithDeepMerge;
ObjectUtil.objectWithoutBlankValues = objectWithoutBlankValues_1.objectWithoutBlankValues;
ObjectUtil.objectWithValueAtPath = objectWithValueAtPath_1.objectWithValueAtPath;
ObjectUtil.queryStringGivenObject = queryStringGivenObject_1.queryStringGivenObject;
ObjectUtil.valueAtPathGivenObject = valueAtPathGivenObject_1.valueAtPathGivenObject;
//# sourceMappingURL=index.js.map