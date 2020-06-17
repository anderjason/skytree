import { PathPart } from "./PathPart";

export function itemAtPathGivenObject(object: any, path: PathPart[]): any {
  let index = 0;
  let length = path.length;

  while (object != null && index < length) {
    object = object[path[index++]];
  }

  return index && index == length ? object : undefined;
}
