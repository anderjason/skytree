export function optionalIndexOfFirstMatchGivenArray<T>(
  array: T[],
  isMatch: (value: T) => boolean
): number | undefined {
  if (array == null) {
    return undefined;
  }

  if (array.length === 0) {
    return undefined;
  }

  if (!Array.isArray(array)) {
    throw new Error("Expected an array");
  }

  for (let i = 0; i < array.length; i++) {
    const value = array[i];
    if (isMatch(value)) {
      return i;
    }
  }

  return undefined;
}
