"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractDateTime = void 0;
const sortableDateStringGivenDateTime_1 = require("./_internal/sortableDateStringGivenDateTime");
const writtenDateGivenDateTime_1 = require("./_internal/writtenDateGivenDateTime");
const flexibleTimeStringGivenAbstractDateTime_1 = require("./_internal/flexibleTimeStringGivenAbstractDateTime");
const sortableTimeStringGivenDateTime_1 = require("./_internal/sortableTimeStringGivenDateTime");
class AbstractDateTime {
    constructor(calendarYear, calendarMonth, calendarDay) {
        this._calendarYear = calendarYear;
        this._calendarMonth = calendarMonth;
        this._calendarDay = calendarDay;
    }
    static givenDefinition(definition) {
        return new AbstractDateTime(definition.calendarYear, definition.calendarMonth, definition.calendarDay);
    }
    withTimeParts(hours24, minutes, seconds = 0, milliseconds = 0) {
        const result = new AbstractDateTime(this._calendarYear, this._calendarMonth, this._calendarDay);
        result._hours24 = hours24;
        result._minutes = minutes;
        result._seconds = seconds;
        result._milliseconds = milliseconds;
        return result;
    }
    withDateParts(calendarYear, calendarMonth, calendarDay) {
        const result = new AbstractDateTime(calendarYear, calendarMonth, calendarDay);
        result._hours24 = this._hours24;
        result._minutes = this._minutes;
        result._seconds = this._seconds;
        result._milliseconds = this._milliseconds;
        return result;
    }
    withoutMilliseconds() {
        const result = new AbstractDateTime(this._calendarYear, this._calendarMonth, this._calendarDay);
        result._hours24 = this._hours24;
        result._minutes = this._minutes;
        result._seconds = this._seconds;
        result._milliseconds = 0;
        return result;
    }
    withoutSeconds() {
        const result = new AbstractDateTime(this._calendarYear, this._calendarMonth, this._calendarDay);
        result._hours24 = this._hours24;
        result._minutes = this._minutes;
        result._seconds = 0;
        result._milliseconds = 0;
        return result;
    }
    toSortableDateString(format) {
        return sortableDateStringGivenDateTime_1.sortableDateStringGivenDateTime(this, format);
    }
    toSortableTimeString(format) {
        return sortableTimeStringGivenDateTime_1.sortableTimeStringGivenDateTime(this, format);
    }
    toWrittenDateString(format) {
        return writtenDateGivenDateTime_1.writtenDateGivenDateTime(this, format);
    }
    toFlexibleTimeString() {
        return flexibleTimeStringGivenAbstractDateTime_1.flexibleTimeStringGivenAbstractDateTime(this);
    }
    toCalendarYear() {
        return this._calendarYear;
    }
    toCalendarMonth() {
        return this._calendarMonth;
    }
    toCalendarDay() {
        return this._calendarDay;
    }
    toHours24() {
        return this._hours24;
    }
    toHours12() {
        if (this._hours24 === 0 || this._hours24 === 12) {
            return 12;
        }
        return this._hours24 % 12;
    }
    toAmPm() {
        return this._hours24 < 12 ? "a.m." : "p.m.";
    }
    toMinutes() {
        return this._minutes;
    }
    toSeconds() {
        return this._seconds;
    }
    toMilliseconds() {
        return this._milliseconds;
    }
}
exports.AbstractDateTime = AbstractDateTime;
//# sourceMappingURL=index.js.map