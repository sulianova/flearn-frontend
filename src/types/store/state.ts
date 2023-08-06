import { ICourseData, ILessonsState } from 'types';

export interface IRootState {
    user?: IUserState
    course?: ICourseState
    lessons?: ILessonsState
    ui?: IBasicState
}

export type IState =
    | IUserState
    | ICourseState
    | ILessonsState
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
