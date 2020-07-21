"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writtenDateGivenDateTime = void 0;
const nameGivenCalendarMonth_1 = require("./nameGivenCalendarMonth");
function writtenDateGivenDateTime(dateTime, format) {
    switch (format) {
        case "January 1, 1980":
            const monthName = nameGivenCalendarMonth_1.nameGivenCalendarMonth(dateTime.toCalendarMonth());
            return `${monthName} ${dateTime.toCalendarDay()}, ${dateTime.toCalendarYear()}`;
        default:
            throw new Error("Unsupported format in writtenDateGivenDateTime");
    }
}
exports.writtenDateGivenDateTime = writtenDateGivenDateTime;
//# sourceMappingURL=writtenDateGivenDateTime.js.map