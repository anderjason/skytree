"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortableDateStringGivenDateTime = void 0;
const padZero_1 = require("./padZero");
function sortableDateStringGivenDateTime(dateTime, format) {
    const year = dateTime.toCalendarYear();
    const month = padZero_1.stringWithPaddedZeros(dateTime.toCalendarMonth(), 2);
    const day = padZero_1.stringWithPaddedZeros(dateTime.toCalendarDay(), 2);
    switch (format) {
        case "2019-12-31":
            return `${year}-${month}-${day}`;
        case "20191231":
            return `${year}${month}${day}`;
        case "191231":
            const twoDigitYear = year.toString().slice(2);
            return `${twoDigitYear}${month}${day}`;
        default:
            throw new Error("Unsupported format");
    }
}
exports.sortableDateStringGivenDateTime = sortableDateStringGivenDateTime;
//# sourceMappingURL=sortableDateStringGivenDateTime.js.map