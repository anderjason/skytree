import { stringWithSpaceCase } from "./stringWithSpaceCase";

export function stringWithCamelCase(input: string): string {
  if (input == null) {
    throw new Error("input is required");
  }

  return stringWithSpaceCase(input).replace(
    /\s(\w)/g,
    (matches: any, letter: any) => {
      return letter.toUpperCase();
    }
  );
}
