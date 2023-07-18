import { ICourseData } from 'types/course';

export interface IRootState {
    course?: ICourseData
}

export type TStateName = keyof IRootState;
