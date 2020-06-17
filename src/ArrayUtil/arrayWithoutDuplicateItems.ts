export function arrayWithoutDuplicateItems<T>(items: T[]): T[] {
  const seen = new Set<T>();
  const result: T[] = [];

  // preserve order of the items

  items.forEach((item) => {
    if (!seen.has(item)) {
      seen.add(item);
      result.push(item);
    }
  });

  return result;
}
