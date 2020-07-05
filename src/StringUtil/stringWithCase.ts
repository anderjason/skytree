import { stringWithCamelCase } from "./stringWithCamelCase";
import { stringWithKebabCase } from "./stringWithKebabCase";
import { stringWithInitialCapital } from "./stringWithInitialCapital";
import { stringWithPascalCase } from "./stringWithPascalCase";
import { stringWithSnakeCase } from "./stringWithSnakeCase";
import { stringWithSpaceCase } from "./stringWithSpaceCase";

export type StringCase =
  | "camelCase"
  | "Initial capital"
  | "kebab-case"
  | "PascalCase"
  | "snake_case"
  | "space case";

export function stringWithCase(input: string, stringCase: StringCase): string {
  switch (stringCase) {
    case "camelCase":
      return stringWithCamelCase(input);
    case "Initial capital":
      return stringWithInitialCapital(input);
    case "kebab-case":
      return stringWithKebabCase(input);
    case "PascalCase":
      return stringWithPascalCase(input);
    case "snake_case":
      return stringWithSnakeCase(input);
    case "space case":
      return stringWithSpaceCase(input);
    default:
      throw new Error("Unsupported string case");
  }
}
