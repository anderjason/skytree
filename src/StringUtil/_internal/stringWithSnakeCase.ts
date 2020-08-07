import { stringWithNoCase } from "./stringWithNoCase";

export function stringWithSnakeCase(input: string): string {
  if (input == null) {
    throw new Error("input is required");
  }

  return stringWithNoCase(input)
    .replace(/[\W_]+(.|$)/g, (matches: any, match: any) => {
      return match ? "_" + match : "";
    })
    .trim();
}
