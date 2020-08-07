import { ValuePath, PathPart } from "../../ValuePath";

export function objectWithValueAtPath<T>(
  object: T,
  valuePath: PathPart[] | ValuePath,
  value: any
): T {
  if (valuePath == null) {
    throw new Error("Value path is required");
  }

  let index = 0;
  let parts: PathPart[];

  if (Array.isArray(valuePath)) {
    parts = valuePath;
  } else {
    parts = valuePath.toParts();
  }

  let length = parts.length;

  // shallow clone
  let result: T;
  if (Array.isArray(object)) {
    result = ([...(object as any[])] as unknown) as T;
  } else {
    result = { ...(object as any) };
  }

  // mutate the clone
  let pointer: any = result;
  while (pointer != null && index < length - 1) {
    let key = parts[index];

    if (Array.isArray(pointer[key])) {
      pointer[key] = [...pointer[key]];
    } else {
      pointer[key] = { ...pointer[key] };
    }

    pointer = pointer[key];

    index += 1;
  }

  if (pointer != null) {
    pointer[parts[index]] = value;
  }

  return result;
}
