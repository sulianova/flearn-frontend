import { ICourseData, IHomeworkData, ILessonData, ILessonsData, IUserData } from 'types';

export interface IRootState {
  user: IUserState
  course: ICourseState
  lessons: ILessonsState
  lesson: ILessonState
  homework?: IHomeworkState
  ui?: IBasicState
}

export type IState =
  | IUserState
  | ICourseState
  | ILessonsState
  | ILessonState
  | IHomeworkState
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

export enum ECommonErrorTypes {
  Unauthorized = 'unauthorized',
  Restricted = 'restricted',
  DataIsCorrupted = 'data is corrupted',
  Other = 'other',
}

export enum ELessonErrorTypes {
  FailedToFindLesson = 'failed to find lesson',
}

export interface ILessonState {
  courseId: string
  lessonId: string
  source: 'local' | 'remote'
  data?: ILessonData
  state?: TStateState<ECommonErrorTypes | ELessonErrorTypes>
}

export interface ILessonsState {
  lessons: ILessonsData[]
  state?: TStateState<ECommonErrorTypes>
}

type TStateState<T> =
  | { type: 'idle' }
  | { type: 'pending' }
  | { type: 'error', error: Error, errorType: T };

export interface IBasicState {
  [key: string]: {}
}

export interface IHomeworkState {
  data?: IHomeworkData
}
