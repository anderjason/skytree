"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.optionalRandomItemGivenArray = void 0;
function optionalRandomItemGivenArray(input) {
    if (input == null) {
        return undefined;
    }
    if (!Array.isArray(input)) {
        return undefined;
    }
    if (input.length === 0) {
        return undefined;
    }
    return input[Math.floor(Math.random() * input.length)];
}
exports.optionalRandomItemGivenArray = optionalRandomItemGivenArray;
//# sourceMappingURL=optionalRandomItemGivenArray.js.map