export interface DeepMergeOptions {
  clone?: boolean;
  isMergeableObject?: (object: any) => boolean;
  arrayMerge?: (target: any, source: any, options: DeepMergeOptions) => any;
}

function defaultIsMergeableObject(value: any) {
  return isNonNullObject(value) && !isSpecial(value);
}

function isNonNullObject(value: any) {
  return !!value && typeof value === "object";
}

function isSpecial(value: any) {
  const stringValue = Object.prototype.toString.call(value);

  return (
    stringValue === "[object RegExp]" ||
    stringValue === "[object Date]" ||
    isReactElement(value)
  );
}

// see https://github.com/facebook/react/blob/b5ac963fb791d1298e7f396236383bc955f916c1/src/isomorphic/classic/element/ReactElement.js#L21-L25
const canUseSymbol = typeof Symbol === "function" && Symbol.for;
const REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for("react.element") : 0xeac7;

function isReactElement(value: any) {
  return value.$$typeof === REACT_ELEMENT_TYPE;
}

function emptyTarget(val: any) {
  return Array.isArray(val) ? [] : {};
}

function cloneUnlessOtherwiseSpecified(
  value: any,
  options: DeepMergeOptions = {}
): any {
  const isMergeableObject =
    options.isMergeableObject || defaultIsMergeableObject;

  return options.clone !== false && isMergeableObject(value)
    ? objectWithDeepMerge(emptyTarget(value), value, options)
    : value;
}

function defaultArrayMerge(
  target: any,
  source: any,
  options: DeepMergeOptions = {}
) {
  return target.concat(source).map((element: any) => {
    return cloneUnlessOtherwiseSpecified(element, options);
  });
}

function mergeObject(target: any, source: any, options: DeepMergeOptions = {}) {
  const destination: any = {};

  const isMergeableObject =
    options.isMergeableObject || defaultIsMergeableObject;

  if (isMergeableObject(target)) {
    Object.keys(target).forEach((key: string) => {
      destination[key] = cloneUnlessOtherwiseSpecified(target[key], options);
    });
  }

  Object.keys(source).forEach((key: string) => {
    if (!isMergeableObject(source[key]) || !target[key]) {
      destination[key] = cloneUnlessOtherwiseSpecified(source[key], options);
    } else {
      destination[key] = objectWithDeepMerge(target[key], source[key], options);
    }
  });

  return destination;
}

export function objectWithDeepMerge(
  target: any,
  source: any,
  options: DeepMergeOptions = {}
) {
  options.arrayMerge = options.arrayMerge || defaultArrayMerge;
  options.isMergeableObject =
    options.isMergeableObject || defaultIsMergeableObject;

  const sourceIsArray = Array.isArray(source);
  const targetIsArray = Array.isArray(target);
  const sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;

  if (!sourceAndTargetTypesMatch) {
    return cloneUnlessOtherwiseSpecified(source, options);
  } else if (sourceIsArray) {
    return options.arrayMerge(target, source, options);
  } else {
    return mergeObject(target, source, options);
  }
}
