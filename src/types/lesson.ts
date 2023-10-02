import * as images from 'assets/images';
import { TText } from './course';

export interface ILessonBlock {
  factoid?: TText | TText[]
}

export interface ILessonTitleBlock extends ILessonBlock {
  type: 'title'
  title: string
}

export interface ILessonGalleryBlock extends ILessonBlock {
  type: 'gallery'
  images: Array<{ imageSrc: keyof typeof images, imageAlt: string }>
}

export interface ILessonFactoidBlock extends ILessonBlock {
  type: 'factoid'
  factoid: TText | TText[]
}

export interface ILessonTextBlock extends ILessonBlock {
  type: 'text'
  text: TText | TText[]
}

export interface ILessonQouteBlock extends ILessonBlock {
  type: 'qoute'
  qoute: TText | TText[]
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
    caption?: TText | TText[]
  }
}

export interface ILessonImageBlock extends ILessonBlock {
  type: 'image'
  imageData: {
    src: keyof typeof images
    alt: string
    caption?: TText | TText[]
  }
}

export type ILessonContent = Array<ILessonTextBlock | ILessonFactoidBlock | ILessonQouteBlock | ILessonTextImportantBlock | ILessonTitleBlock  | ILessonVideoBlock | ILessonImageBlock>;

export interface ILessonData {
  id: string
  title: string
  type: 'Theory' | 'Practice'
  startDate: Date
  endDate: Date
  resultsEndDate: Date
  lectureLink?: string
  homeworkLink?: string
  webinarLink?: string
  resultsLink?: string
  content: ILessonContent
}

export interface ILessonDataDB {
  id: string
  title: string
  type: 'Theory' | 'Practice'
  startDate: { seconds: number, nanoseconds: number }
  endDate: { seconds: number, nanoseconds: number }
  resultsEndDate: { seconds: number, nanoseconds: number }
  lectureLink?: string
  homeworkLink?: string
  webinarLink?: string
  resultsLink?: string
  content: ILessonContent
}

export interface ILessonDataLocal {
  id: string
  title: string
  type: 'Theory' | 'Practice'
  startDate: string
  endDate: string
  resultsEndDate: string
  lectureLink?: string
  homeworkLink?: string
  webinarLink?: string
  resultsLink?: string
  content: ILessonContent
}
