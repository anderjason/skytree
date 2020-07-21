import { AbstractDateTime } from "..";

export function flexibleTimeStringGivenAbstractDateTime(
  dateTime: AbstractDateTime
): string {
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
