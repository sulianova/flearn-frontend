import type { IArticleContent } from './article';
import type { TText } from './course';
import type { IUserData } from './user';

export interface IHomeworkData {
  id: string
  courseId: string
  lessonId: string
  text?: TText | TText[],
  reference?: TText | TText[]
  images?: Array<{ id: string, src: string, alt: string }>
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
  images?: Array<{ id: string, alt: string }>
  review?: IArticleContent
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
