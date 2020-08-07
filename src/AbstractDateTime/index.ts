import { sortableDateStringGivenDateTime } from "./_internal/sortableDateStringGivenDateTime";
import { writtenDateGivenDateTime } from "./_internal/writtenDateGivenDateTime";
import { flexibleTimeStringGivenAbstractDateTime } from "./_internal/flexibleTimeStringGivenAbstractDateTime";
import { sortableTimeStringGivenDateTime } from "./_internal/sortableTimeStringGivenDateTime";

export type WrittenDateStringFormat = "January 1, 1980";
export type SortableDateStringFormat = "2019-12-31" | "20191231" | "191231";
export type SortableTimeStringFormat = "23:59:59" | "235959";
export type SortableDateTimeStringFormat =
  | "2019-12-31 23:59:59"
  | "20191231 235959";

export type AbstractDateTimeStringFormat =
  | "sortableDate"
  | "writtenDate"
  | "flexibleTime";

export interface AbstractDateTimeDefinition {
  calendarYear: number;
  calendarMonth: number;
  calendarDay: number;
}

export class AbstractDateTime {
  private _calendarYear: number;
  private _calendarMonth: number;
  private _calendarDay: number;
  private _hours24: number;
  private _minutes: number;
  private _seconds: number;
  private _milliseconds: number;

  static givenDefinition(
    definition: AbstractDateTimeDefinition
  ): AbstractDateTime {
    return new AbstractDateTime(
      definition.calendarYear,
      definition.calendarMonth,
      definition.calendarDay
    );
  }

  private constructor(
    calendarYear: number,
    calendarMonth: number,
    calendarDay: number
  ) {
    this._calendarYear = calendarYear;
    this._calendarMonth = calendarMonth;
    this._calendarDay = calendarDay;
  }

  withTimeParts(
    hours24: number,
    minutes: number,
    seconds: number = 0,
    milliseconds: number = 0
  ): AbstractDateTime {
    const result = new AbstractDateTime(
      this._calendarYear,
      this._calendarMonth,
      this._calendarDay
    );
    result._hours24 = hours24;
    result._minutes = minutes;
    result._seconds = seconds;
    result._milliseconds = milliseconds;
    return result;
  }

  withDateParts(
    calendarYear: number,
    calendarMonth: number,
    calendarDay: number
  ): AbstractDateTime {
    const result = new AbstractDateTime(
      calendarYear,
      calendarMonth,
      calendarDay
    );
    result._hours24 = this._hours24;
    result._minutes = this._minutes;
    result._seconds = this._seconds;
    result._milliseconds = this._milliseconds;
    return result;
  }

  withoutMilliseconds(): AbstractDateTime {
    const result = new AbstractDateTime(
      this._calendarYear,
      this._calendarMonth,
      this._calendarDay
    );
    result._hours24 = this._hours24;
    result._minutes = this._minutes;
    result._seconds = this._seconds;
    result._milliseconds = 0;
    return result;
  }

  withoutSeconds(): AbstractDateTime {
    const result = new AbstractDateTime(
      this._calendarYear,
      this._calendarMonth,
      this._calendarDay
    );
    result._hours24 = this._hours24;
    result._minutes = this._minutes;
    result._seconds = 0;
    result._milliseconds = 0;
    return result;
  }

  toSortableDateString(format: SortableDateStringFormat): string {
    return sortableDateStringGivenDateTime(this, format);
  }

  toSortableTimeString(format: SortableTimeStringFormat): string {
    return sortableTimeStringGivenDateTime(this, format);
  }

  toWrittenDateString(format: WrittenDateStringFormat): string {
    return writtenDateGivenDateTime(this, format);
  }

  toFlexibleTimeString(): string {
    return flexibleTimeStringGivenAbstractDateTime(this);
  }

  toCalendarYear(): number {
    return this._calendarYear;
  }

  toCalendarMonth(): number {
    return this._calendarMonth;
  }

  toCalendarDay(): number {
    return this._calendarDay;
  }

  toHours24(): number {
    return this._hours24;
  }

  toHours12(): number {
    if (this._hours24 === 0 || this._hours24 === 12) {
      return 12;
    }

    return this._hours24 % 12;
  }

  toAmPm(): "a.m." | "p.m." {
    return this._hours24 < 12 ? "a.m." : "p.m.";
  }

  toMinutes(): number {
    return this._minutes;
  }

  toSeconds(): number {
    return this._seconds;
  }

  toMilliseconds(): number {
    return this._milliseconds;
  }
}
