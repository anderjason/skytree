"use strict";
/**
 * @author Jason Anderson <jason@gearsandwires.com>
 * @copyright 2016-2019 Gears & Wires
 * @license See vendor/wireframe/LICENSE file
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.valueGivenArray = void 0;
function valueGivenArray(array) {
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
exports.valueGivenArray = valueGivenArray;
//# sourceMappingURL=valueGivenArray.js.map