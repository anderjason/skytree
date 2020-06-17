import { DeepMergeOptions, objectWithDeepMerge } from "./objectWithDeepMerge";

export function mergedObjectGivenObjects(
  objects: any,
  options?: DeepMergeOptions
) {
  if (!Array.isArray(objects)) {
    throw new Error("First argument should be an array");
  }

  return objects.reduce((prev, next) => {
    return objectWithDeepMerge(prev, next, options);
  }, {});
}
