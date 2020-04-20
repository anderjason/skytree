export function arrayWithoutItem<T>(input: T[], excludeItem: T): T[] {
  if (input == null) {
    throw new Error("input is required");
  }

  if (excludeItem == null) {
    return [...input];
  }

  return input.filter((item) => item !== excludeItem);
}
