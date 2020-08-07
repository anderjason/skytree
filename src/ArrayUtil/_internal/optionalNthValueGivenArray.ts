export function optionalNthValueGivenArray<T>(
  array: T[],
  n: number
): T | undefined {
  if (array == null) {
    return undefined;
  }

  if (!Array.isArray(array)) {
    return undefined;
  }

  return n < array.length ? array[n] : undefined;
}
