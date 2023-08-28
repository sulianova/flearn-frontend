import { ICourseData, IHomeworkData, ILessonsState, ILessonState } from 'types';

export interface IRootState {
  user?: IUserState
  course?: ICourseData
  lessons?: ILessonsState
  lesson?: ILessonState
  homework?: IHomeworkState
  ui?: IBasicState
}

export type IState =
  | IUserState
  | ICourseData
  | ILessonsState
  | ILessonState
  | IHomeworkState
  | IBasicState;

export type TStateName = keyof IRootState;

export interface IUserState {
  id: string
  name: string
}

export interface IBasicState {
  [key: string]: {}
}

export interface IHomeworkState {
  data?: IHomeworkData
}
