export type TContact = {
  email: string
  name?: string
}

export type TEmail = {
  to: TContact[],
  from: TContact,
  subject: string,
  html: string,
}

export enum EEmail {
  OrderCreated = 'OrderCreated',
}
