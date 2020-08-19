export function arrayWithEqualSizeGroups<T>(
  input: T[],
  groupSize: number
): T[][] {
  if (input == null) {
    throw new Error("input is required");
  }

  if (groupSize == null) {
    throw new Error("groupSize is required");
  }

  if (groupSize < 1) {
    throw new Error("groupSize must be greater than 0");
  }

  const result = [];
  const length = input.length;

  let i = 0;
  while (i < length) {
    result.push(input.slice(i, (i += groupSize)));
  }

  return result;
}
