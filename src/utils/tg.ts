import { Falsy } from './universal';

export const TG_MESSAGE_IN_URL_NEW_LINE_SYMBOL = '%0A';
export function composeTgMessage(rows: (string | Exclude<Falsy, ''>)[]) {
  return rows.filter((row) => typeof row === 'string').join(TG_MESSAGE_IN_URL_NEW_LINE_SYMBOL);
}
