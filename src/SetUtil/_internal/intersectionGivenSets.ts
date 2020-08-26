import { ArrayUtil } from "../../ArrayUtil";

export function intersectionGivenSets<T>(sets: Set<T>[]): Set<T> {
  if (sets == null) {
    throw new Error("Sets are required");
  }

  if (sets.length === 0) {
    return new Set();
  }

  if (sets.length === 1) {
    return new Set(sets[0]);
  }

  const result = new Set<T>();

  const smallestSet = ArrayUtil.arrayWithOrderFromValue(
    sets,
    (s) => s.size,
    "ascending"
  )[0];
  const otherSets: Set<T>[] = ArrayUtil.arrayWithoutValue(sets, smallestSet);

  smallestSet.forEach((item) => {
    if (otherSets.every((otherSet) => otherSet.has(item))) {
      result.add(item);
    }
  });

  return result;
}
