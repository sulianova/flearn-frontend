export const MS_PER_SECOND = 1000;
export const MS_PER_MINUTE = MS_PER_SECOND * 60;
export const MS_PER_HOUR = MS_PER_MINUTE * 60;
export const MS_PER_DAY = MS_PER_HOUR * 24;
export const MS_PER_WEEK = MS_PER_DAY * 7;
export const MS_PER_MONTH = MS_PER_WEEK * 4;
export const MS_PER_YEAR = MS_PER_MONTH * 12;
export const SEC_PER_MINUTE = 60;
export const SEC_PER_HOUR = SEC_PER_MINUTE * 60;

/**
 * @param date Date
 * @param days - Amount of days to add (to subtract)
 */
export function addDays(date: Date, days: number): Date {
  const copyDate = new Date(date.valueOf());
  copyDate.setDate(copyDate.getDate() + days);
  return copyDate;
}

export function addMinutes(date: Date, minutes: number): Date {
  return new Date(date.getTime() + minutes * MS_PER_MINUTE);
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
export function formatDate(date: Date, params: { timeZone?: TTimeZone, wWeekDay?: true, wTime?: true } = {}) {
  const { timeZone, wWeekDay, wTime } = params;
  date = timeZone ? changeTimezone(date, timeZone) : date;

  let weekDay: string;
  if (wWeekDay) {
    weekDay = date.toLocaleDateString(['ru-RU'], { weekday: "long" });
  };

  let time: string;
  if (wTime) {
    time = date.toLocaleDateString(['ru-RU'], { hour: '2-digit', minute: '2-digit' })
      .split(', ')[1];
  }

  const dateStr = date.toLocaleDateString(['ru-RU'], { month: 'long', day: 'numeric' }).replace(' ', '\u00A0');
  return [
    wWeekDay && weekDay!,
    wTime ? (dateStr + ',') : dateStr,
    wTime && time!,
  ]
    .filter(p => p && p !== undefined)
    .join(' ');
}
