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

export function nameGivenCalendarMonth(calendarMonth: number): string {
  const index = calendarMonth - 1;
  if (index < 0 || index > 11) {
    throw new Error("Invalid calendar month");
  }

  return names[index];
}
