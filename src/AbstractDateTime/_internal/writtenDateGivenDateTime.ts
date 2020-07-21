import { AbstractDateTime, WrittenDateStringFormat } from "..";
import { nameGivenCalendarMonth } from "./nameGivenCalendarMonth";

export function writtenDateGivenDateTime(
  dateTime: AbstractDateTime,
  format: WrittenDateStringFormat
): string {
  switch (format) {
    case "January 1, 1980":
      const monthName = nameGivenCalendarMonth(dateTime.toCalendarMonth());
      return `${monthName} ${dateTime.toCalendarDay()}, ${dateTime.toCalendarYear()}`;
    default:
      throw new Error("Unsupported format in writtenDateGivenDateTime");
  }
}
