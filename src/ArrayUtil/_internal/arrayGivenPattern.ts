export function arrayGivenPattern<T>(input: T[], length: number): T[] {
  if (input == null) {
    throw new Error("input is required");
  }

  if (length == null) {
    throw new Error("length is required");
  }

  if (length < 0) {
    throw new Error("length must not be negative");
  }

  if (length == 0) {
    return [];
  }

  const result: T[] = [];

  for (let i = 0; i < length; i++) {
    const inputIndex = i % input.length;
    result.push(input[inputIndex]);
  }

  return result;
}
