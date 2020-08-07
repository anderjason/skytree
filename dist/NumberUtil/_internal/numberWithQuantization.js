"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.numberWithQuantization = void 0;
function numberWithQuantization(input, quantum, type) {
    const remainder = input % quantum;
    const sign = input >= 0 ? 1 : -1;
    const mod = type == "cover" && remainder ? quantum : 0;
    return input - remainder + sign * mod;
}
exports.numberWithQuantization = numberWithQuantization;
//# sourceMappingURL=numberWithQuantization.js.map