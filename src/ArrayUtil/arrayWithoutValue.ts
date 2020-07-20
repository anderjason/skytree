export function arrayWithoutValue<T>(input: T[], excludeValue: T): T[] {
  if (input == null) {
    throw new Error("input is required");
  }

  if (excludeValue == null) {
    return [...input];
  }

  return input.filter((item) => item !== excludeValue);
}
