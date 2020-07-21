/**
 * @author Jason Anderson <jason@gearsandwires.com>
 * @copyright 2016-2019 Gears & Wires
 * @license See vendor/wireframe/LICENSE file
 */

export function arrayIsEmptyOrNull<T>(input?: T[]): boolean {
  if (input == null) {
    return true;
  }

  if (!Array.isArray(input)) {
    throw new Error("input must be an array");
  }

  return input.length === 0;
}
