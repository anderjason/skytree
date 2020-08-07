"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.objectWithDeepMerge = void 0;
function defaultIsMergeableObject(value) {
    return isNonNullObject(value) && !isSpecial(value);
}
function isNonNullObject(value) {
    return !!value && typeof value === "object";
}
function isSpecial(value) {
    const stringValue = Object.prototype.toString.call(value);
    return (stringValue === "[object RegExp]" ||
        stringValue === "[object Date]" ||
        isReactElement(value));
}
// see https://github.com/facebook/react/blob/b5ac963fb791d1298e7f396236383bc955f916c1/src/isomorphic/classic/element/ReactElement.js#L21-L25
const canUseSymbol = typeof Symbol === "function" && Symbol.for;
const REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for("react.element") : 0xeac7;
function isReactElement(value) {
    return value.$$typeof === REACT_ELEMENT_TYPE;
}
function emptyTarget(val) {
    return Array.isArray(val) ? [] : {};
}
function cloneUnlessOtherwiseSpecified(value, options = {}) {
    const isMergeableObject = options.isMergeableObject || defaultIsMergeableObject;
    return options.clone !== false && isMergeableObject(value)
        ? objectWithDeepMerge(emptyTarget(value), value, options)
        : value;
}
function defaultArrayMerge(target, source, options = {}) {
    return target.concat(source).map((element) => {
        return cloneUnlessOtherwiseSpecified(element, options);
    });
}
function mergeObject(target, source, options = {}) {
    const destination = {};
    const isMergeableObject = options.isMergeableObject || defaultIsMergeableObject;
    if (isMergeableObject(target)) {
        Object.keys(target).forEach((key) => {
            destination[key] = cloneUnlessOtherwiseSpecified(target[key], options);
        });
    }
    Object.keys(source).forEach((key) => {
        if (!isMergeableObject(source[key]) || !target[key]) {
            destination[key] = cloneUnlessOtherwiseSpecified(source[key], options);
        }
        else {
            destination[key] = objectWithDeepMerge(target[key], source[key], options);
        }
    });
    return destination;
}
function objectWithDeepMerge(target, source, options = {}) {
    options.arrayMerge = options.arrayMerge || defaultArrayMerge;
    options.isMergeableObject =
        options.isMergeableObject || defaultIsMergeableObject;
    const sourceIsArray = Array.isArray(source);
    const targetIsArray = Array.isArray(target);
    const sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;
    if (!sourceAndTargetTypesMatch) {
        return cloneUnlessOtherwiseSpecified(source, options);
    }
    else if (sourceIsArray) {
        return options.arrayMerge(target, source, options);
    }
    else {
        return mergeObject(target, source, options);
    }
}
exports.objectWithDeepMerge = objectWithDeepMerge;
//# sourceMappingURL=objectWithDeepMerge.js.map