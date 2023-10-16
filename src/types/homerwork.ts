import type { IArticleContent } from './article';
import type { TText } from './course';
import type { IUserData } from './user';

export interface IHomeworkData {
  id: string
  courseId: string
  lessonId: string
  text?: TText | TText[],
  reference?: TText | TText[]
  images?: IHomeworkImageData[]
  userId: string
  review?: IArticleContent
}

export interface IHomeworkDataDB {
  id: string
  courseId: string
  lessonId: string
  userId: string
  text?: TText | TText[],
  reference?: TText | TText[]
  images?: IHomeworkImageDataDB[]
  review?: IArticleContent
}

interface IHomeworkImageData {
  id: string
  src: string
  alt: string // same as originalName
  originalName: string
}

interface IHomeworkImageDataDB {
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
