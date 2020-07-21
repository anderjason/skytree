/**
 * @author Jason Anderson <jason@gearsandwires.com>
 * @copyright 2016-2019 Gears & Wires
 * @license See vendor/wireframe/LICENSE file
 */

export function valueGivenArray<T>(array: T[]): T {
  if (array == null) {
    throw new Error("array is required");
  }

  if (!Array.isArray(array)) {
    throw new Error("Input must be an array");
  }

  if (array.length === 0) {
    throw new Error("At least one item is required");
  }

  return array[0];
}
