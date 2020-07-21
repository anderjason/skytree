"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setWithoutItem = void 0;
function setWithoutItem(set, item, isMatch) {
    let result = new Set(set);
    if (isMatch == null) {
        result.delete(item);
    }
    else {
        const setItems = Array.from(result);
        setItems.forEach((setItem) => {
            if (isMatch(item, setItem)) {
                result.delete(setItem);
            }
        });
    }
    return result;
}
exports.setWithoutItem = setWithoutItem;
//# sourceMappingURL=setWithoutItem.js.map