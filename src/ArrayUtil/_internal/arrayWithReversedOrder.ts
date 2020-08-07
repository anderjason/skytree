export function arrayWithReversedOrder<T>(input: T[]): T[] {
  if (input == null) {
    throw new Error("Input is required");
  }

  const clone = [...input];
  return clone.reverse();
}
