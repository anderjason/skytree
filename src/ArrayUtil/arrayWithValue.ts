export function arrayWithValue<T>(
  input: T[],
  value: T,
  allowDuplicates: boolean
): T[] {
  const result = [...input];

  if (result.indexOf(value) === -1 || allowDuplicates) {
    result.push(value);
  }

  return result;
}
