/**
 * @author Jason Anderson <jason@gearsandwires.com>
 * @copyright 2016-2019 Gears & Wires
 * @license See vendor/wireframe/LICENSE file
 */

export type Dict = {
  [key: string]: string;
};

export type UnmatchedTokenBehavior = "ignore" | "remove" | "error";

export function stringWithReplacedTokens(
  input: string,
  variables: Dict,
  unmatchedTokenBehavior: UnmatchedTokenBehavior
): string {
  let result = input;

  Object.keys(variables).forEach((key) => {
    const value = variables[key]!;
    const regex = new RegExp(`{{\\s?${key}\\s?}}`, "g");

    result = result.replace(regex, value);
  });

  const hasUnmatchedTokens: boolean = /{{\s?\w+\s?}}/g.test(result);
  if (hasUnmatchedTokens == true) {
    switch (unmatchedTokenBehavior) {
      case "error":
        throw new Error("Template has unmatched tokens");
      case "remove":
        result = result.replace(/\s*{{\s?\w+\s?}}(\s?)\s*/g, "$1");
        break;
      case "ignore":
        break;
    }
  }

  return result;
}
