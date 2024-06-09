export function isDefined<T>(value: T | null | undefined): value is NonNullable<T> {
  return value !== null && value !== undefined
}

export function safeObjectKeys<T extends {}>(obj: T) {
  return Object.keys(obj) as Array<keyof T>;
}
