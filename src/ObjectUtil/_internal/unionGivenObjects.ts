import { objectWithDeepMerge } from "./objectWithDeepMerge";

export function unionGivenObjects(...objects: any[]) {
  return objects.reduce((prev, next) => {
    return objectWithDeepMerge(prev, next);
  }, {});
}
