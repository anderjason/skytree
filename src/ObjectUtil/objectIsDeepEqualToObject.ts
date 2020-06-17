export function objectIsDeepEqualToObject(actual: any, expected: any): boolean {
  if (actual === expected) {
    return true;
  } else if (actual instanceof Date && expected instanceof Date) {
    return actual.getTime() === expected.getTime();
  } else if (
    !actual ||
    !expected ||
    (typeof actual !== "object" && typeof expected !== "object")
  ) {
    return actual === expected;
  } else {
    return objEquiv(actual, expected);
  }
}

function isArguments(object: any) {
  return Object.prototype.toString.call(object) == "[object Arguments]";
}

function isUndefinedOrNull(value: any) {
  return value === null || value === undefined;
}

function isBuffer(x: any) {
  if (!x || typeof x !== "object" || typeof x.length !== "number") {
    return false;
  }

  if (typeof x.copy !== "function" || typeof x.slice !== "function") {
    return false;
  }

  if (x.length > 0 && typeof x[0] !== "number") {
    return false;
  }

  return true;
}

function objEquiv(a: any, b: any) {
  let i, key;

  if (isUndefinedOrNull(a) || isUndefinedOrNull(b)) {
    return false;
  }

  if (a.prototype !== b.prototype) {
    return false;
  }

  if (isArguments(a)) {
    if (!isArguments(b)) {
      return false;
    }
    a = Array.prototype.slice.call(a);
    b = Array.prototype.slice.call(b);
    return objectIsDeepEqualToObject(a, b);
  }

  if (isBuffer(a)) {
    if (!isBuffer(b)) {
      return false;
    }

    if (a.length !== b.length) {
      return false;
    }

    for (i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) {
        return false;
      }
    }

    return true;
  }

  let ka, kb;

  try {
    ka = Object.keys(a);
    kb = Object.keys(b);
  } catch (e) {
    return false;
  }

  if (ka.length != kb.length) {
    return false;
  }

  ka.sort();
  kb.sort();

  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] != kb[i]) {
      return false;
    }
  }

  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!objectIsDeepEqualToObject(a[key], b[key])) {
      return false;
    }
  }

  return typeof a === typeof b;
}
