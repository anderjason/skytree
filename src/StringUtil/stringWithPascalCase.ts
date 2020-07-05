import { stringWithCamelCase } from "./stringWithCamelCase";

export function stringWithPascalCase(input: string): string {
  if (input == null) {
    throw new Error("input is required");
  }

  const camel = stringWithCamelCase(input);
  return camel.charAt(0).toUpperCase() + camel.slice(1);
}
