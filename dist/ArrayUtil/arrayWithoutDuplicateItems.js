"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.arrayWithoutDuplicateItems = void 0;
function arrayWithoutDuplicateItems(items) {
    const seen = new Set();
    const result = [];
    // preserve order of the items
    items.forEach((item) => {
        if (!seen.has(item)) {
            seen.add(item);
            result.push(item);
        }
    });
    return result;
}
exports.arrayWithoutDuplicateItems = arrayWithoutDuplicateItems;
//# sourceMappingURL=arrayWithoutDuplicateItems.js.map