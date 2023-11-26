
/**
 * @param date Date
 * @param days - Amount of days to add (to subtract)
 */
export function addDays(date: Date, days: number): Date {
  const copyDate = new Date(date.valueOf());
  copyDate.setDate(copyDate.getDate() + days);
  return copyDate;
}

type TTimeZone =
  | 'Europe/Moscow';

/**
 * This function will return INCORRECT Date object, but time in this object will be CORRECT.
 * E.g. '2023.11.26 12:00:00 GMT+0100 (Central European Standard Time)' (Belgrade)
 * converted to Moscow timezone will become '2023.11.26 14:00:00 GMT+0100 (Central European Standard Time)'
 * Currently there is no method to create Date object with different timezone than user's time zone.
 * @param date - Date
 * @param timeZone - target time zone
 */
export function changeTimezone(date: Date, timeZone: TTimeZone) {
  return new Date(date.toLocaleString('en-US', {
    timeZone,
  }));
}

/**
 * Format date to string
 */
export function formatDate(date: Date, params: { timeZone?: TTimeZone, woTime?: true }) {
  date = params.timeZone ? changeTimezone(date, params.timeZone) : date;
  if (params.woTime) {
    return date.toLocaleDateString(
      ['ru-RU'],
      { month: 'long', day: 'numeric' }
    );
  }

  return date.toLocaleDateString(
    ['ru-RU'],
    { month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }
  ).replace(' в ', ', ');
}
