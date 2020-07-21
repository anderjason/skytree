"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flexibleTimeStringGivenAbstractDateTime = void 0;
function flexibleTimeStringGivenAbstractDateTime(dateTime) {
    // like 9:45
    let result = `${dateTime.toHours12()}:${dateTime
        .toMinutes()
        .toString()
        .padStart(2, "0")}`;
    const seconds = dateTime.toSeconds();
    const milliseconds = dateTime.toMilliseconds();
    if (seconds != 0 || milliseconds != 0) {
        // like 9:45:19
        result += `:${seconds.toString().padStart(2, "0")}`;
    }
    if (milliseconds != 0) {
        // like 9:45:19.110
        result += `.${Math.round(milliseconds)}`;
    }
    result += ` ${dateTime.toAmPm()}`;
    return result;
}
exports.flexibleTimeStringGivenAbstractDateTime = flexibleTimeStringGivenAbstractDateTime;
//# sourceMappingURL=flexibleTimeStringGivenAbstractDateTime.js.map