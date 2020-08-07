"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringWithInitialCapital = void 0;
function stringWithInitialCapital(input) {
    if (input == null) {
        throw new Error("input is required");
    }
    if (input.length === 0) {
        return input;
    }
    return input.charAt(0).toUpperCase() + input.slice(1);
}
exports.stringWithInitialCapital = stringWithInitialCapital;
//# sourceMappingURL=stringWithInitialCapital.js.map