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
  text?: TText | TText[],
  reference?: TText | TText[]
  review?: IArticleContent
}

export interface IHomeworkImageData {
  id: string
  src: string
  alt: string // same as originalName
  originalName: string
}

export interface IHomeworkImageDataDB {
  id: string
  alt: string // same as originalName
  originalName: string
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
