"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringWithOnlyInitialCapital = void 0;
function stringWithOnlyInitialCapital(input) {
    if (input == null) {
        throw new Error("input is required");
    }
    if (input.length === 0) {
        return input;
    }
    return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
}
exports.stringWithOnlyInitialCapital = stringWithOnlyInitialCapital;
//# sourceMappingURL=stringWithOnlyInitialCapital.js.map