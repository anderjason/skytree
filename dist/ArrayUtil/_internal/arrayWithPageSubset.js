"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.arrayWithPageSubset = void 0;
function arrayWithPageSubset(input, startIndex, pageSize) {
    const start = startIndex;
    const end = start + pageSize;
    return input.slice(start, end);
}
exports.arrayWithPageSubset = arrayWithPageSubset;
//# sourceMappingURL=arrayWithPageSubset.js.map