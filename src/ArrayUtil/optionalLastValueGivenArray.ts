export function optionalLastValueGivenArray<T>(array: T[]): T | undefined {
  if (array == null) {
    return undefined;
  }

  if (!Array.isArray(array)) {
    return undefined;
  }

  if (array.length === 0) {
    return undefined;
  }

  return array[array.length - 1];
}
