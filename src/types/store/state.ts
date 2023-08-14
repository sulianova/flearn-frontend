import { ICourseData, ILessonData, ILessonsState, IUserData } from 'types';

export interface IRootState {
  user?: IUserState
  course?: ICourseState
  lessons?: ILessonsState
  lesson?: ILessonState
  ui?: IBasicState
}

export type IState =
  | IUserState
  | ICourseState
  | ILessonsState
  | ILessonState
  | IBasicState;

export type TStateName = keyof IRootState;

export interface IUserState {
  user?: IUserData
}

export interface ICourseState {
  courseId: string
  source: 'local' | 'remote'
  hasLocal: boolean
  hasRemote: boolean
  data?: ICourseData
}

export interface ILessonState {
  courseId: string
  lessonId: string
  source: 'local' | 'remote'
  hasLocal: boolean
  hasRemote: boolean
  data?: ILessonData
}

export interface IBasicState {
  [key: string]: {}
}
