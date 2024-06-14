import type { ICourseData, ICourseDataDB, ICourseProductOption, ICourseProductOptionDB } from 'services/course.service';
import type { IUserData, IUserDataDB } from 'services/user.service';

export interface IOrderData {
    status: 'created' | 'rejected' | 'closed'
    userFromForm: {
        email: string
    }
    chosenProductOption: {
        type: keyof ICourseData['productOptions']
        option: ICourseProductOption
    }
    currentAuthedUser: IUserData | null
    course: {
        id: string
        options: ICourseData['productOptions']
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
    chosenProductOption: {
        type: keyof ICourseDataDB['productOptions']
        option: ICourseProductOptionDB
    }
    currentAuthedUser: IUserDataDB | null
    course: {
        id: string
        options: ICourseDataDB['productOptions']
    }
    meta: {
        createdAt: string
    }
}
