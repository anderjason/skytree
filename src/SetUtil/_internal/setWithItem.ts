export function setWithItem<T>(set: Set<T> | undefined, item: T): Set<T> {
  let result = new Set(set);
  result.add(item);
  return result;
}
