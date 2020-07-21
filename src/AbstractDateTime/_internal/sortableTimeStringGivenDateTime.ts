import { AbstractDateTime, SortableTimeStringFormat } from "..";
import { stringWithPaddedZeros } from "./padZero";

export function sortableTimeStringGivenDateTime(
  dateTime: AbstractDateTime,
  format: SortableTimeStringFormat
): string {
  const hours: string = stringWithPaddedZeros(dateTime.toHours24(), 2);
  const minutes: string = stringWithPaddedZeros(dateTime.toMinutes(), 2);
  const seconds: string = stringWithPaddedZeros(dateTime.toSeconds(), 2);

  switch (format) {
    case "23:59:59":
      return `${hours}:${minutes}:${seconds}`;
    case "235959":
      return `${hours}${minutes}${seconds}`;
    default:
      throw new Error("Unsupported format in sortableTimeStringOfDateTime");
  }
}
