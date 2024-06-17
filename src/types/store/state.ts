import { IHomeworkData, IHomeworkDataWPopulate } from 'types';

export interface IRootState {
  homework?: IHomeworkState
  homeworks: IHomeworksState
  ui?: IBasicState
}

export type IState =
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
