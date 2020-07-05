export function stringWithInitialCapital(input: string): string {
  if (input == null) {
    throw new Error("input is required");
  }

  return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
}
