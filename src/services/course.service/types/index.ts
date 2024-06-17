import { ECommonErrorTypes, TStateState } from 'types';
import type { TText } from 'ui/Text/Text';

import { ICourseDataContent, TImageDataAdjustable } from './contentFR';
import { ICourseDataContentDB, TImageDataAdjustableDB } from './contentDB';

export * from './contentCommon';
export * from './contentDB';
export * from './contentFR';

export type TSource = 'remote' | 'local';

export interface IFetchCourseProps {
  ids?: string[]
  userId?: string
}

interface ICourseDataCommon {
  id: string
  type: 'course' | 'intensive' | 'webinar'
  duration: {
    unit: 'day' | 'week'
    value: number
  }
  homeworksNumber: number
  feild: 'Иллюстрация' | 'Adobe'
  tags?: string[]
  title: string
  level: 'beginner' | 'intermediate' | 'advanced'
  telegramLink: string
}

export interface ICourseProductOption {
  price: number
  description?: TText
  discount?: {
    amountPrc: number
    deadline?: Date
  }
}

export interface ICourseProductOptionDB {
  price: number
  description?: TText
  discount?: {
    amountPrc: number
    deadline?: string
  }
}

export interface ICourseData extends ICourseDataCommon {
  startDate: Date
  endDate: Date
  accessDeadline: Date
  introImage: TImageDataAdjustable
  introDescription: string
  cardImage?: TImageDataAdjustable
  discount?: {
    amountPrc: number
    deadline?: Date
  }
  productOptions: {
    BASE: ICourseProductOption
    OPTIMAL: ICourseProductOption
    EXTENDED?: ICourseProductOption
  }
  content: ICourseDataContent
}

export interface ICourseDataDB extends ICourseDataCommon {
  startDate: string
  endDate: string
  accessDeadline: string
  introImage: TImageDataAdjustableDB
  introDescription: string
  cardImage?: TImageDataAdjustableDB
  discount?: {
    amountPrc: number
    deadline?: string
  }
  productOptions: {
    BASE: ICourseProductOptionDB
    OPTIMAL: ICourseProductOptionDB
    EXTENDED?: ICourseProductOptionDB
  }
  content: ICourseDataContentDB
}


export type TActionS =
  | { type: 'updated', payload: { id: string } };

export type TCourseError =
  | ECommonErrorTypes.DataIsCorrupted
  | ECommonErrorTypes.FailedToFindData
  | ECommonErrorTypes.Other;

export type TCourseState = TStateState<TCourseError>;

interface MyError extends Error {
  ErrorType: TCourseError
}

export type TActionBS =
  | null
  | { courses: ICourseData[] }
  | MyError;
