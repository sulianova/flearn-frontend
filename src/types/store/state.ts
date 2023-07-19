import { ICourseData } from 'types/course';

export interface IRootState {
    user?: IUserState
    course?: ICourseData
    ui?: IBasicState
}

export type IState =
    | IUserState
    | ICourseData
    | IBasicState;

export type TStateName = keyof IRootState;

export interface IUserState {
    id: string
    name: string
}

export interface IBasicState {
    [key: string]: {}
}
