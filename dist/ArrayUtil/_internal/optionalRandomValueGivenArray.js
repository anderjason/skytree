"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.optionalRandomValueGivenArray = void 0;
function optionalRandomValueGivenArray(input) {
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
exports.optionalRandomValueGivenArray = optionalRandomValueGivenArray;
//# sourceMappingURL=optionalRandomValueGivenArray.js.map