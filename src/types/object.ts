export interface IObject<T = any> {
    [key: string]: T
}

export type IPayload =
  | undefined
  | null
  | boolean
  | string
  | string[]
  | number
  | number[]
  | IObject
  | IObject[];

export enum ECommonErrorTypes {
  Unauthorized = 'unauthorized',
  Restricted = 'restricted',
  DataIsCorrupted = 'data is corrupted',
  FailedToFindData = 'failed to find data',
  Other = 'other',
}

export type TStateState<T> =
  | { type: 'idle' }
  | { type: 'pending' }
  | { type: 'error', error: Error, errorType: T };
