export declare type WrittenDateStringFormat = "January 1, 1980";
export declare type SortableDateStringFormat = "2019-12-31" | "20191231" | "191231";
export declare type SortableTimeStringFormat = "23:59:59" | "235959";
export declare type SortableDateTimeStringFormat = "2019-12-31 23:59:59" | "20191231 235959";
export declare type AbstractDateTimeStringFormat = "sortableDate" | "writtenDate" | "flexibleTime";
export interface AbstractDateTimeDefinition {
    calendarYear: number;
    calendarMonth: number;
    calendarDay: number;
}
export declare class AbstractDateTime {
    private _calendarYear;
    private _calendarMonth;
    private _calendarDay;
    private _hours24;
    private _minutes;
    private _seconds;
    private _milliseconds;
    static givenDefinition(definition: AbstractDateTimeDefinition): AbstractDateTime;
    private constructor();
    withTimeParts(hours24: number, minutes: number, seconds?: number, milliseconds?: number): AbstractDateTime;
    withDateParts(calendarYear: number, calendarMonth: number, calendarDay: number): AbstractDateTime;
    withoutMilliseconds(): AbstractDateTime;
    withoutSeconds(): AbstractDateTime;
    toSortableDateString(format: SortableDateStringFormat): string;
    toSortableTimeString(format: SortableTimeStringFormat): string;
    toWrittenDateString(format: WrittenDateStringFormat): string;
    toFlexibleTimeString(): string;
    toCalendarYear(): number;
    toCalendarMonth(): number;
    toCalendarDay(): number;
    toHours24(): number;
    toHours12(): number;
    toAmPm(): "a.m." | "p.m.";
    toMinutes(): number;
    toSeconds(): number;
    toMilliseconds(): number;
}
