import type { IArticleContent } from './article';
import type { TText } from './course';
import type { IUserData } from './user';

export interface IHomeworkData {
  id: string
  userId: string
  courseId: string
  lessonId: string
  description: string
  externalHomeworkLink: string
  images: IHomeworkImageData[]
  state: THomeworkState
  text?: TText | TText[],
  reference?: TText | TText[]
  review?: IArticleContent
}

export interface IHomeworkDataDB {
  id: string
  userId: string
  courseId: string
  lessonId: string
  description: string
  externalHomeworkLink: string
  images: IHomeworkImageDataDB[]
  state: THomeworkState
  text?: TText | TText[],
  reference?: TText | TText[]
  review?: IArticleContent
}

export type THomeworkState =
  | 'DRAFT'
  | 'SENT_FOR_REVIEW'
  | 'IN_REVIEW'
  | 'REVIEWED'

export interface IHomeworkImageData {
  id: string
  src: string
  alt: string // same as originalName
  originalName: string
  caption: string
}

export interface IHomeworkImageDataDB {
  id: string
  alt: string // same as originalName
  originalName: string
  caption: string
}

export type IHomeworkPopulateRequest = {
  user?: boolean
}

export interface IHomeworkDataWPopulate {
  homework: IHomeworkData
  populate?: {
    user?: IUserData
  }
}
