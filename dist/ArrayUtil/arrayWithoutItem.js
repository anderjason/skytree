"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.arrayWithoutItem = void 0;
function arrayWithoutItem(input, excludeItem) {
    if (input == null) {
        throw new Error("input is required");
    }
    if (excludeItem == null) {
        return [...input];
    }
    return input.filter((item) => item !== excludeItem);
}
exports.arrayWithoutItem = arrayWithoutItem;
//# sourceMappingURL=arrayWithoutItem.js.map