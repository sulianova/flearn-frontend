import { ECommonErrorTypes, TStateState, TText } from 'types';

export interface ICourseData {
  id: string
  type?: 'course' | 'webinar'
  startDate: Date
  endDate: Date
  accessDeadline: Date
  durationWeeks: number
  duration?: {
    unit: 'day' | 'week',
    value: number
  }
  homeworksNumber: number
  videosNumber: number
  feild: 'Иллюстрация' | 'Adobe'
  title: string
  introImageId: string
  introDescription: string
  introImageSrc: string
  introImageAlt: string
  discontAmount: number
  discontDeadline: Date | null
  creditWas: number
  creditPrice: number
  telegramLink: string
  about?: TText | TText[]
  description: Array<{ question: string, answer: string }>
  prizes?: Array<{ title: TText | TText[], content?: TText | TText[] }>
  modulesDescription: TText | TText[]
  modules: Array<{ meta: TText | TText[], title: TText | TText[], content: TText | TText[], imageDesc?: TText | TText[] } & Partial<TImageData>>
  explainMedia: { type: 'image', imageId: string, imageSrc: string, imageAlt: string } | { type: 'video', title: string, src: string },
  promoVideo?: { title: string, src: string }
  teachers: Array<{ title: TText | TText[], description: TText | TText[], imageId: string, imageSrc: string, imageAlt: string }>
  teacherGallery: Array<{imageId: string, imageSrc: string, imageAlt: string}>
  studentsWorks: Array<{imageId: string, imageSrc: string, imageAlt: string}>
  faq: Array<{ question: TText | TText[], answer: TText | TText[] }>
}

export interface ICourseDataDB {
  id: string
  type?: 'course' | 'webinar'
  startDate: string
  endDate: string
  accessDeadline: string
  durationWeeks: number
  duration?: {
    unit: 'day' | 'week',
    value: number
  }
  homeworksNumber: number
  videosNumber: number
  feild: 'Иллюстрация' | 'Adobe'
  title: string
  introImageId: string
  introDescription: string
  introImageAlt: string
  discontAmount: number
  discontDeadline: string | null
  creditWas: number
  creditPrice: number
  telegramLink: string
  about?: TText | TText[]
  description: Array<{ question: string, answer: string }>
  prizes?: Array<{ title: TText | TText[], content?: TText | TText[] }>
  modulesDescription: TText | TText[]
  modules: Array<{ meta: TText | TText[], title: TText | TText[], content: TText | TText[], imageDesc?: TText | TText[] } & Partial<TImageDataDB>>
  explainMedia: { type: 'image', imageId: string, imageAlt: string } | { type: 'video', title: string, src: string },
  promoVideo?: { title: string, src: string }
  teachers: Array<{ title: TText | TText[], description: TText | TText[], imageId: string, imageAlt: string }>
  teacherGallery: Array<{imageId: string, imageAlt: string}>
  studentsWorks: Array<{imageId: string, imageAlt: string}>
  faq: Array<{ question: TText | TText[], answer: TText | TText[] }>
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
