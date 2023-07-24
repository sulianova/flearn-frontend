import { ICourseData, ILessonsState } from 'types';

export interface IRootState {
    user?: IUserState
    course?: ICourseData
    lessons?: ILessonsState
    ui?: IBasicState
}

export type IState =
    | IUserState
    | ICourseData
    | ILessonsState
    | IBasicState;

export type TStateName = keyof IRootState;

export interface IUserState {
    id: string
    name: string
}

export interface IBasicState {
    [key: string]: {}
}
