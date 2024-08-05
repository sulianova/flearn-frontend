import { ECommonErrorTypes, TStateState } from 'types';
import type { TIcon } from 'ui/Icon/Icon';
import type { TText } from 'ui/Text/Text';

import type { ICourseDataContent, TImageDataAdjustable } from './contentFR';
import type { ICourseDataContentDB, TImageDataAdjustableDB } from './contentDB';

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
  icon: {
    icon: TIcon
    color?: string
  }
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

export type TCourseProductOptionTypes = keyof ICourseData['productOptions'];

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
