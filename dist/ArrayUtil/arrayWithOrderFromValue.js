"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function arrayWithOrderFromValue(input, getSortableValue, descending = false) {
    const result = [...input];
    if (descending) {
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