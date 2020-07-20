export function optionalRandomValueGivenArray<T>(input: T[]): T | undefined {
  if (input == null) {
    return undefined;
  }

  if (!Array.isArray(input)) {
    return undefined;
  }

  if (input.length === 0) {
    return undefined;
  }

  return input[Math.floor(Math.random() * input.length)];
}
