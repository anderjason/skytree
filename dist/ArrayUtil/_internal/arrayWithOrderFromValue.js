"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.arrayWithOrderFromValue = void 0;
function arrayWithOrderFromValue(input, getSortableValue, direction) {
    const result = [...input];
    if (direction === "descending") {
        result.sort((a, b) => {
            const valueA = getSortableValue(a);
            const valueB = getSortableValue(b);
            if (valueA < valueB) {
                return 1;
            }
            if (valueA > valueB) {
                return -1;
            }
            return 0;
        });
    }
    else {
        result.sort((a, b) => {
            const valueA = getSortableValue(a);
            const valueB = getSortableValue(b);
            if (valueA < valueB) {
                return -1;
            }
            if (valueA > valueB) {
                return 1;
            }
            return 0;
        });
    }
    return result;
}
exports.arrayWithOrderFromValue = arrayWithOrderFromValue;
//# sourceMappingURL=arrayWithOrderFromValue.js.map