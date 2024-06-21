import type { IArticleContent, IArticleContentDB } from 'types';
import type { IUserData } from '../user.service';

export interface IHomeworkData {
  id: string
  userId: string
  courseId: string
  lessonId: string
  description: string
  externalHomeworkLink: string
  images: IHomeworkImageData[]
  state: THomeworkState
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
  review?: IArticleContentDB
}

export type THomeworkState =
  | 'DRAFT'
  | 'SENT_FOR_REVIEW'
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

export type TActionS =
  | { type: 'created', payload: { id: string, courseId: string, lessonId: string, userId: string } }
  | { type: 'updated', payload: { id: string } };

export interface IFetchHomeworksProps {
  filter: { courseId: string } & Partial<Pick<IHomeworkData, 'id'| 'lessonId' | 'userId' | 'state'>>
  populate?: { user?: boolean }
  reviewSource?: 'local' | 'remote'
}
