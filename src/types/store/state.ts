import { ICourseData } from 'services/course.service';
import { IHomeworkData, IHomeworkDataWPopulate } from 'types';

export interface IRootState {
  course: ICourseState
  homework?: IHomeworkState
  homeworks: IHomeworksState
  ui?: IBasicState
}

export type IState =
  | ICourseState
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

export interface ICourseState {
  courseId: string
  source: 'local' | 'remote'
  data?: ICourseData
  state?: TStateState<ECommonErrorTypes.DataIsCorrupted | ECommonErrorTypes.FailedToFindData | ECommonErrorTypes.Other>
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
