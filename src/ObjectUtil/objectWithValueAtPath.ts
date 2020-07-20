import { PathPart } from "./PathPart";

export function objectWithValueAtPath<T>(
  object: T,
  path: PathPart[],
  value: any
): T {
  let index = 0;
  let length = path.length;

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
    let key = path[index];

    if (Array.isArray(pointer[key])) {
      pointer[key] = [...pointer[key]];
    } else {
      pointer[key] = { ...pointer[key] };
    }

    pointer = pointer[key];

    index += 1;
  }

  if (pointer != null) {
    pointer[path[index]] = value;
  }

  return result;
}
