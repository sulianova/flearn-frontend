
/**
 * @param date Date
 * @param days - Amount of days to add (to subtract)
 * @returns new Date
 */
export function addDays(date: Date, days: number): Date {
  const copyDate = new Date(date.valueOf());
  copyDate.setDate(copyDate.getDate() + days);
  return copyDate;
}
