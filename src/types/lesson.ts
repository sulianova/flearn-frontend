import { TText } from './course';

export interface ILessonBlock {
  factoid?: TText | TText[]
}

export interface ILessonTitleBlock extends ILessonBlock {
  type: 'title'
  title: string
}

export interface ILessonGalleryBlockDB extends ILessonBlock {
  type: 'gallery'
  images: Array<{ id: string, alt: string }>
}

export interface ILessonGalleryBlock extends ILessonBlock {
  type: 'gallery'
  images: Array<{ id: string, src: string, alt: string }>
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

export interface ILessonImageBlockDB extends ILessonBlock {
  type: 'image'
  imageData: {
    id: string
    alt: string
    caption?: TText | TText[]
  }
}

export interface ILessonImageBlock extends ILessonBlock {
  type: 'image'
  imageData: {
    id: string
    src: string
    alt: string
    caption?: TText | TText[]
  }
}

export type ILessonContentDB = Array<ILessonTextBlock | ILessonFactoidBlock | ILessonQouteBlock | ILessonTextImportantBlock | ILessonTitleBlock  | ILessonVideoBlock | ILessonImageBlockDB | ILessonGalleryBlockDB>;
export type ILessonContent = Array<ILessonTextBlock | ILessonFactoidBlock | ILessonQouteBlock | ILessonTextImportantBlock | ILessonTitleBlock  | ILessonVideoBlock | ILessonImageBlock | ILessonGalleryBlock>;

export interface ILessonData {
  id: string
  courseId: string
  title: string
  type: 'Theory' | 'Practice'
  week: number
  startDate: Date
  endDate: Date
  resultsEndDate: Date
  content: ILessonContent
}

export interface ILessonDataDB {
  id: string
  courseId: string
  title: string
  type: 'Theory' | 'Practice'
  week: number
  startDate: string
  endDate: string
  resultsEndDate: string
  content: ILessonContentDB
}
