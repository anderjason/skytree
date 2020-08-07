export function unionGivenSets<T>(...sets: Set<T>[]) {
  if (!Array.isArray(sets)) {
    throw new Error("First argument should be an array");
  }

  const result = new Set();

  sets.forEach((set) => {
    set.forEach((v) => {
      result.add(v);
    });
  });

  return result;
}
