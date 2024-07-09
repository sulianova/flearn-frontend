import { TURLSectionObj } from 'router';
import { ILessonFilter } from 'services/data.service/Lesson';
import { TSurvey } from 'services/surveyAnswers.service';
import { IUserData } from 'services/user.service';
import { TAccess } from 'services/userAccess.service';
import { ECommonErrorTypes, TStateState } from 'types';
import type { TText } from 'ui/Text/Text';

export interface IFetchLessonsProps extends ILessonFilter {}

export type TSource = 'remote' | 'local';

export type TCourseLessonsBSDependencies = {
  source: TSource
  section: TURLSectionObj
  authedUser: IUserData | null
  courseAccess: TAccess | null
}

export type TCourseLessonsBSValue = {
  lessons: Array<ILessonData & { solved: boolean, canBeAccessed: boolean }> | null
  dependencies: TCourseLessonsBSDependencies | null
}
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
  survey?: TSurvey
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
  survey?: TSurvey
}

export type TActionS = { type: 'updated' };

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

export interface ILessonQuestionBlock extends ILessonBlock {
  type: 'quiz'
  quiz: TText
}

export interface ILessonTextBlock extends ILessonBlock {
  type: 'text'
  text: TText
}

export interface ILessonQuoteBlock extends ILessonBlock {
  type: 'quote'
  quote: TText
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

export interface ILessonListBlock extends ILessonBlock {
  type: 'list'
  items: TText[]
}


export type ILessonContentDB = Array<ILessonTextBlock | ILessonQuestionBlock | ILessonQuoteBlock | ILessonTextImportantBlock | ILessonTitleBlock  | ILessonVideoBlock | ILessonImageBlockDB | ILessonGalleryBlockDB | ILessonListBlock>;
export type ILessonContent = Array<ILessonTextBlock | ILessonQuestionBlock | ILessonQuoteBlock | ILessonTextImportantBlock | ILessonTitleBlock  | ILessonVideoBlock | ILessonImageBlock | ILessonGalleryBlock | ILessonListBlock>;
