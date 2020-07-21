export function setWithoutItem<T>(
  set: Set<T> | undefined,
  item: T,
  isMatch?: (one: T, two: T) => boolean
): Set<T> {
  let result = new Set(set);

  if (isMatch == null) {
    result.delete(item);
  } else {
    const setItems = Array.from(result);
    setItems.forEach((setItem) => {
      if (isMatch(item, setItem)) {
        result.delete(setItem);
      }
    });
  }

  return result;
}
