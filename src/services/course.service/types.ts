import { ECommonErrorTypes, TStateState, TText } from 'types';

export type TSource = 'remote' | 'local';

export interface IFetchCourseProps {
  ids?: string[]
  userId?: string
}

export interface ICourseData {
  id: string
  type: 'course' | 'intensive' | 'webinar'
  startDate: Date
  endDate: Date
  accessDeadline: Date
  duration: {
    unit: 'day' | 'week',
    value: number
  }
  homeworksNumber: number
  videosNumber: number
  feild: 'Иллюстрация' | 'Adobe'
  tags?: string[]
  title: string
  introImage: TImageData
  introDescription: string
  cardImage?: TImageData
  discontAmount: number
  discontDeadline: Date | null
  creditWas: number
  creditPrice: number
  telegramLink: string
  about?: TText | TText[]
  description?: Array<{ question: string, answer: string }>
  prizes?: Array<{ title: TText | TText[], content?: TText | TText[] }>
  modulesDescription?: TText | TText[]
  modules?: Array<{ meta: TText | TText[], title: TText | TText[], content: TText | TText[], activities?: TText | TText[], imageDesc?: TText | TText[] } & Partial<TImageData>>
  explainMedia?: { type: 'image', imageId: string, imageSrc: string, imageAlt: string } | { type: 'video', title: string, src: string },
  promoVideo?: { title: string, src: string }
  teacherGallery?: Array<{imageId: string, imageSrc: string, imageAlt: string}>
  studentResults?: { content: TText | TText[] } & TImageData
  studentsWorks?: Array<{imageId: string, imageSrc: string, imageAlt: string}>
  faq?: Array<{ question: TText | TText[], answer: TText | TText[] }>
  feedbacks?: Array<{ author: { name: string, description?: string }, quote: TText | TText[], excerpt?: string }>
  studyProcess?: Array<AddOptionalObject<{ caption?: TText | TText[], title: TText | TText[], description: TText | TText[] }, TImageData>>
}

export interface ICourseDataDB {
  id: string
  type: 'course' | 'intensive' | 'webinar'
  startDate: string
  endDate: string
  accessDeadline: string
  duration: {
    unit: 'day' | 'week',
    value: number
  }
  homeworksNumber: number
  videosNumber: number
  feild: 'Иллюстрация' | 'Adobe'
  tags?: string[]
  title: string
  introImage: TImageDataDB
  introDescription: string
  cardImage?: TImageDataDB
  discontAmount: number
  discontDeadline: string | null
  creditWas: number
  creditPrice: number
  telegramLink: string
  about?: TText | TText[]
  description?: Array<{ question: string, answer: string }>
  prizes?: Array<{ title: TText | TText[], content?: TText | TText[] }>
  modulesDescription?: TText | TText[]
  modules?: Array<{ meta: TText | TText[], title: TText | TText[], content: TText | TText[], activities?: TText | TText[], imageDesc?: TText | TText[] } & Partial<TImageDataDB>>
  explainMedia?: { type: 'image', imageId: string, imageAlt: string } | { type: 'video', title: string, src: string },
  promoVideo?: { title: string, src: string }
  teacherGallery?: Array<{imageId: string, imageAlt: string}>
  studentResults?: { content: TText | TText[] } & TImageDataDB
  studentsWorks?: Array<{imageId: string, imageAlt: string}>
  faq?: Array<{ question: TText | TText[], answer: TText | TText[] }>
  feedbacks?: Array<{ author: { name: string, description?: string }, quote: TText | TText[], excerpt?: string }>
  studyProcess?: Array<AddOptionalObject<{ caption?: TText | TText[], title: TText | TText[], description: TText | TText[] }, TImageDataDB>>
}

type TImageData  = (
  {
    imageId: string
    imageSrc: string
  } |
  {
    imageId: { desktop: string, mobile: string }
    imageSrc: { desktop: string, mobile: string }
  }
) & {
  imageAlt: string
}

type TImageDataDB = (
  {
    imageId: string
  } |
  {
    imageId: { desktop: string, mobile: string }
  }
) & {
  imageAlt: string
}

type AddOptionalObject<A extends object, B extends object> = A | (A & B);


export type TActionS =
  | { type: 'updated', payload: { id: string } };

export type TCourseError =
  | ECommonErrorTypes.DataIsCorrupted
  | ECommonErrorTypes.FailedToFindData
  | ECommonErrorTypes.Other;

export type TCourseState = TStateState<TCourseError>;

interface MyError extends Error {
  ErrorType: TCourseError
}

export type TActionBS =
  | null
  | { courses: ICourseData[] }
  | MyError;
