export interface IDiscount {
  id: string
  type: 'personal'
  email: string
  product: 'subscription'
  startDate: Date
  minutes: number
  endDate: Date
  discountPRC: number
  realized: boolean
}

export interface IDiscountDB {
  id: string
  type: 'personal'
  email: string
  product: 'subscription'
  startDate: string
  minutes: number
  endDate: string
  discountPRC: number
  realized: boolean
}
