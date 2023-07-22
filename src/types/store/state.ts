import { ICourseData } from 'types/course';

export interface IRootState {
    user?: IUserState
    course?: ICourseState
    ui?: IBasicState
}

export type IState =
    | IUserState
    | ICourseState
    | IBasicState;

export type TStateName = keyof IRootState;

export interface IUserState {
    id: string
    name: string
}

export interface ICourseState {
    data?: ICourseData
    courseIsStoredLocally?: boolean
}

export interface IBasicState {
    [key: string]: {}
}
