import type { IUserData, IUserDataDB } from 'services/user.service';

export interface IOrderData {
    status: 'created' | 'rejected' | 'closed'
    userFromForm: {
        email: string
    }
    currentAuthedUser: IUserData | null
    course: {
        id: string
        dataSnapshot: {
            discontAmount: number
            discontDeadline: Date | null
            creditWas: number
            creditPrice: number
        }
    }
    meta: {
        createdAt: Date
    }
}

export interface IOrderDataDB {
    status: 'created' | 'rejected' | 'closed'
    userFromForm: {
        email: string
    }
    currentAuthedUser: IUserDataDB | null
    course: {
        id: string
        dataSnapshot: {
            discontAmount: number
            discontDeadline: string | null
            creditWas: number
            creditPrice: number
        }
    }
    meta: {
        createdAt: string
    }
}
