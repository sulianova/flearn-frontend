import { ICourseData, ILessonsState, ILessonState } from 'types';

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
  id: string
  name: string
}

export interface ICourseState {
  courseId: string
  source: 'local' | 'remote'
  hasLocal: boolean
  hasRemote: boolean
  data?: ICourseData
}

export interface IBasicState {
  [key: string]: {}
}
