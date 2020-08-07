import { stringWithCamelCase } from "./stringWithCamelCase";
import { stringWithInitialCapital } from "./stringWithInitialCapital";
import { stringWithKebabCase } from "./stringWithKebabCase";
import { stringWithOnlyInitialCapital } from "./stringWithOnlyInitialCapital";
import { stringWithPascalCase } from "./stringWithPascalCase";
import { stringWithSnakeCase } from "./stringWithSnakeCase";
import { stringWithSpaceCase } from "./stringWithSpaceCase";

export type StringCase =
  | "camelCase"
  | "Initial CaPiTaL"
  | "Only initial capital"
  | "kebab-case"
  | "PascalCase"
  | "snake_case"
  | "space case";

export function stringWithCase(input: string, stringCase: StringCase): string {
  switch (stringCase) {
    case "camelCase":
      return stringWithCamelCase(input);
    case "Initial CaPiTaL":
      return stringWithInitialCapital(input);
    case "Only initial capital":
      return stringWithOnlyInitialCapital(input);
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
