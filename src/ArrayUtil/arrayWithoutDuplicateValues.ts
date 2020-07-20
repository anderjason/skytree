export function arrayWithoutDuplicateValues<T>(values: T[]): T[] {
  const seen = new Set<T>();
  const result: T[] = [];

  // preserve order of the items

  values.forEach((item) => {
    if (!seen.has(item)) {
      seen.add(item);
      result.push(item);
    }
  });

  return result;
}
