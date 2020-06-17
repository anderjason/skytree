"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pageItemsGivenArray = void 0;
function pageItemsGivenArray(input, startIndex, pageSize) {
    const start = startIndex;
    const end = start + pageSize;
    return input.slice(start, end);
}
exports.pageItemsGivenArray = pageItemsGivenArray;
//# sourceMappingURL=pageItemsGivenArray.js.map