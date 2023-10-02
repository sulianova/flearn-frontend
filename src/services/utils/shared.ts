export function dateDB2FR(date: string): Date {
  return new Date(date);
}

export function dateFR2DB(date: Date): string {
  return date.toISOString();
}
