"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.arrayWithReversedOrder = void 0;
function arrayWithReversedOrder(input) {
    if (input == null) {
        throw new Error("Input is required");
    }
    const clone = [...input];
    return clone.reverse();
}
exports.arrayWithReversedOrder = arrayWithReversedOrder;
//# sourceMappingURL=arrayWithReversedOrder.js.map