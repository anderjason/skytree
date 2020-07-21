"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortableTimeStringGivenDateTime = void 0;
const padZero_1 = require("./padZero");
function sortableTimeStringGivenDateTime(dateTime, format) {
    const hours = padZero_1.stringWithPaddedZeros(dateTime.toHours24(), 2);
    const minutes = padZero_1.stringWithPaddedZeros(dateTime.toMinutes(), 2);
    const seconds = padZero_1.stringWithPaddedZeros(dateTime.toSeconds(), 2);
    switch (format) {
        case "23:59:59":
            return `${hours}:${minutes}:${seconds}`;
        case "235959":
            return `${hours}${minutes}${seconds}`;
        default:
            throw new Error("Unsupported format in sortableTimeStringOfDateTime");
    }
}
exports.sortableTimeStringGivenDateTime = sortableTimeStringGivenDateTime;
//# sourceMappingURL=sortableTimeStringGivenDateTime.js.map