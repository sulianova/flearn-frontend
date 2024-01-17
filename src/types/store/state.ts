import { IUserData } from 'services/user.service';
import { ICourseData } from 'services/course.service';
import { IHomeworkData, IHomeworkDataWPopulate, ILessonData, ILessonsData } from 'types';

export interface IRootState {
  user: IUserState
  course: ICourseState
  lessons: ILessonsState
  lesson: ILessonState
  homework?: IHomeworkState
  homeworks: IHomeworksState
  ui?: IBasicState
}

export type IState =
  | IUserState
  | ICourseState
  | ILessonsState
  | ILessonState
  | IHomeworkState
  | IHomeworksState
  | IBasicState;

export type TStateName = keyof IRootState;

export enum ECommonErrorTypes {
  Unauthorized = 'unauthorized',
  Restricted = 'restricted',
  DataIsCorrupted = 'data is corrupted',
  FailedToFindData = 'failed to find data',
  Other = 'other',
}

export type TStateState<T> =
  | { type: 'idle' }
  | { type: 'pending' }
  | { type: 'error', error: Error, errorType: T };

export interface IUserState {
  user?: IUserData
}

export interface ICourseState {
  courseId: string
  source: 'local' | 'remote'
  data?: ICourseData
  state?: TStateState<ECommonErrorTypes.DataIsCorrupted | ECommonErrorTypes.FailedToFindData | ECommonErrorTypes.Other>
}

export interface ILessonState {
  courseId: string
  lessonId: string
  source: 'local' | 'remote'
  data?: ILessonData
  state?: TStateState<ECommonErrorTypes>
}

export interface ILessonsState {
  lessons: ILessonsData[]
  state?: TStateState<ECommonErrorTypes>
}

export interface IBasicState {
  [key: string]: {}
}

export interface IHomeworkState {
  data?: IHomeworkData
}

export interface IHomeworksState {
  homeworks?: IHomeworkDataWPopulate[]
  state?: TStateState<ECommonErrorTypes>
}
