import { IUserData } from './user';

export interface IOrderData {
    status: 'created' | 'rejected' | 'closed'
    userFromForm: {
        email: string
        name: string
        phone: string
    }
    currentAuthedUser?: IUserData
    course: {
        id: string
        dataSnapshot: {
            discontAmount: number
            discontDeadline: Date
            creditWas: number
            creditPrice: number
        }
    }
    meta: {
        createdAt: Date
    }
}
