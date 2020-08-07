export function objectIsEmpty(input: any): boolean {
  if (input == null) {
    return true;
  }

  if (typeof input !== "object") {
    throw new Error("input must be an object");
  }

  return Object.keys(input).length === 0;
}
