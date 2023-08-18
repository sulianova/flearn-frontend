import { ICourseData, ILessonData, ILessonsState, IUserData } from 'types';

export interface IRootState {
  user: IUserState
  course: ICourseState
  lessons: ILessonsState
  lesson: ILessonState
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

export enum ELessonErrorTypes {
  Unauthorized = 'unauthorized',
  Restricted = 'restricted',
  FailedToFindLesson = 'failed to find lesson',
  LessonDataIsCorrupted = 'lesson data is corrupted',
  Other = 'other',
}
export interface ILessonState {
  courseId: string
  lessonId: string
  source: 'local' | 'remote'
  data?: ILessonData
  state?: TStateState<ELessonErrorTypes>
}

type TStateState<T> =
  | { type: 'idle' }
  | { type: 'pending' }
  | { type: 'error', error: Error, errorType: T };

export interface IBasicState {
  [key: string]: {}
}
