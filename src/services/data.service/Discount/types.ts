export interface IDiscount {
  type: 'personal'
  email: string
  product: 'subscription'
  startDate: Date
  minutes: number
  endDate: Date
  discountPRC: number
}

export interface IDiscountDB {
  type: 'personal'
  email: string
  product: 'subscription'
  startDate: string
  minutes: number
  endDate: string
  discountPRC: number
}
