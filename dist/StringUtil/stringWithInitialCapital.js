"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringWithInitialCapital = void 0;
function stringWithInitialCapital(input) {
    if (input == null) {
        throw new Error("input is required");
    }
    return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
}
exports.stringWithInitialCapital = stringWithInitialCapital;
//# sourceMappingURL=stringWithInitialCapital.js.map