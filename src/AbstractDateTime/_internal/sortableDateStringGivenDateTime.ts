import { AbstractDateTime, SortableDateStringFormat } from "..";
import { stringWithPaddedZeros } from "./padZero";

export function sortableDateStringGivenDateTime(
  dateTime: AbstractDateTime,
  format: SortableDateStringFormat
): string {
  const year = dateTime.toCalendarYear();
  const month = stringWithPaddedZeros(dateTime.toCalendarMonth(), 2);
  const day = stringWithPaddedZeros(dateTime.toCalendarDay(), 2);

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
