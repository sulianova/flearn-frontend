export function isDefined<T>(value: T | null | undefined): value is NonNullable<T> {
  return value !== null && value !== undefined
}

export function safeObjectKeys<T extends {}>(obj: T) {
  return Object.keys(obj) as Array<keyof T>;
}

export type TGetObjectValues<T extends {}, Keys extends keyof T = keyof T> =
Keys extends Keys ?
  T[Keys] extends string ?
    T[Keys]
  : T[Keys] extends {} ? TGetObjectValues<T[Keys]> : never
: never;

export type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];
