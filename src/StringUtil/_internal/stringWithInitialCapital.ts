export function stringWithInitialCapital(input: string): string {
  if (input == null) {
    throw new Error("input is required");
  }

  if (input.length === 0) {
    return input;
  }

  return input.charAt(0).toUpperCase() + input.slice(1);
}
