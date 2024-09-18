export type TAccess = 'FREE' | 'BASE' | 'OPTIMAL' | 'EXTENDED';

export interface ISubscription {
  email: string
  access: Exclude<TAccess, 'FREE'>
  startDate: Date
  days: number
  endDate: Date
}

export interface ISubscriptionDB {
  email: string
  access: Exclude<TAccess, 'FREE'>
  startDate: string
  days: number
  endDate: string
}
