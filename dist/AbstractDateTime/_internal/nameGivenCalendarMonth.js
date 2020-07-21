"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nameGivenCalendarMonth = void 0;
const names = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];
function nameGivenCalendarMonth(calendarMonth) {
    const index = calendarMonth - 1;
    if (index < 0 || index > 11) {
        throw new Error("Invalid calendar month");
    }
    return names[index];
}
exports.nameGivenCalendarMonth = nameGivenCalendarMonth;
//# sourceMappingURL=nameGivenCalendarMonth.js.map