import { ILessonFilter } from 'services/data.service/Lesson';
import { ECommonErrorTypes, TStateState } from 'types';
import type { TText } from 'ui/Text/Text';

export interface IFetchLessonsProps extends ILessonFilter {}

export type TSource = 'remote' | 'local';
export interface ILessonData {
  id: string
  courseId: string
  title: string
  type: 'Theory' | 'Practice'
  topic: string
  topicOrder: number
  orderInTopic: number
  duration: {
    unit: 'minutes' | 'hours'
    value: number
  }
  isFree: boolean
  content: ILessonContent
}

export interface ILessonDataDB {
  id: string
  courseId: string
  title: string
  type: 'Theory' | 'Practice'
  topic: string
  topicOrder: number
  orderInTopic: number
  duration: {
    unit: 'minutes' | 'hours'
    value: number
  }
  isFree: boolean
  content: ILessonContentDB
}

export type TActionS =
  | { type: 'updated', payload: { id: string } };

export type TLessonError =
  | ECommonErrorTypes.Restricted
  | ECommonErrorTypes.Unauthorized
  | ECommonErrorTypes.DataIsCorrupted
  | ECommonErrorTypes.FailedToFindData
  | ECommonErrorTypes.Other;

export type TLessonState = TStateState<TLessonError>;

interface MyError extends Error {
  ErrorType: TLessonError
}

export type TActionBS =
  | null
  | { lessons: ILessonData[] }
  | MyError;

export interface ILessonBlock {
  factoid?: TText
}

export interface ILessonTitleBlock extends ILessonBlock {
  type: 'title'
  title: string
}

export interface ILessonGalleryBlockDB extends ILessonBlock {
  type: 'gallery'
  images: Array<{ id: string, alt: string, caption?: TText }>
  maxHeightPx?: number
}

export interface ILessonGalleryBlock extends ILessonBlock {
  type: 'gallery'
  images: Array<{ id: string, src: string, alt: string, caption?: TText }>
  maxHeightPx?: number
}

export interface ILessonFactoidBlock extends ILessonBlock {
  type: 'factoid'
  factoid: TText
}

export interface ILessonTextBlock extends ILessonBlock {
  type: 'text'
  text: TText
}

export interface ILessonQouteBlock extends ILessonBlock {
  type: 'qoute'
  qoute: TText
}

export interface ILessonTextImportantBlock extends ILessonBlock {
  type: 'textImportant'
  text: string
}

export interface ILessonVideoBlock extends ILessonBlock {
  type: 'video'
  videoData: {
    src: string
    title: string
    caption?: TText
  }
}

export interface ILessonImageBlockDB extends ILessonBlock {
  type: 'image'
  imageData: {
    id: string
    alt: string
    caption?: TText
  }
  size?: 'LARGE'
}

export interface ILessonImageBlock extends ILessonBlock {
  type: 'image'
  imageData: {
    id: string
    src: string
    alt: string
    caption?: TText
  }
  size?: 'LARGE'
}

export type ILessonContentDB = Array<ILessonTextBlock | ILessonFactoidBlock | ILessonQouteBlock | ILessonTextImportantBlock | ILessonTitleBlock  | ILessonVideoBlock | ILessonImageBlockDB | ILessonGalleryBlockDB>;
export type ILessonContent = Array<ILessonTextBlock | ILessonFactoidBlock | ILessonQouteBlock | ILessonTextImportantBlock | ILessonTitleBlock  | ILessonVideoBlock | ILessonImageBlock | ILessonGalleryBlock>;
