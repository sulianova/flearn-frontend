import { ICourseData, ILessonsState, ILessonState } from 'types';

export interface IRootState {
  user?: IUserState
  course?: ICourseData
  lessons?: ILessonsState
  lesson?: ILessonState
  ui?: IBasicState
}

export type IState =
  | IUserState
  | ICourseData
  | ILessonsState
  | ILessonState
  | IBasicState;

export type TStateName = keyof IRootState;

export interface IUserState {
  id: string
  name: string
}

export interface IBasicState {
  [key: string]: {}
}
