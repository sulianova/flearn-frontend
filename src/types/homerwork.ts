import type { IArticleContent, IArticleContentDB } from './article';
import { ECommonErrorTypes, TStateState } from './store';
import type { IUserData } from 'services/user.service';

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

export type THomeworkStateState = TStateState<ECommonErrorTypes>;
