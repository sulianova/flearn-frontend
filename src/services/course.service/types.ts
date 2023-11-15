import type { HTMLAttributes } from 'react';
import type { IProps as ILinkProps } from 'ui/Link/Link';

import { ECommonErrorTypes, TStateState, TText } from 'types';

export interface ICourseData {
  id: string
  startDate: Date
  endDate: Date
  durationWeeks: number
  homeworksNumber: number
  videosNumber: number
  feild: 'Иллюстрация' | 'Adobe'
  title: string
  introImageId: string
  introDescription: string
  introImageSrc: string
  introImageAlt: string
  discontAmount: number
  discontDeadline: Date
  creditWas: number
  creditPrice: number
  description: Array<{ question: string, answer: string }>
  modulesDescription: TText | TText[]
  modules: Array<{ meta: TText | TText[], title: TText | TText[], content: TText | TText[], imageId: string, imageDesc: TText | TText[], imageSrc: string, imageAlt: string }>
  explainMedia: { type: 'image', imageId: string, imageSrc: string, imageAlt: string } | { type: 'video', title: string, src: string },
  promoVideo: { title: string, src: string }
  teachers: Array<{ title: TText | TText[], description: TText | TText[], imageId: string, imageSrc: string, imageAlt: string }>
  teacherGallery: Array<{imageId: string, imageSrc: string, imageAlt: string}>
  studentsWorks: Array<{imageId: string, imageSrc: string, imageAlt: string}>
  faq: Array<{ question: TText | TText[], answer: TText | TText[] }>
}

export interface ICourseDataDB {
  id: string
  startDate: string
  endDate: string
  durationWeeks: number
  homeworksNumber: number
  videosNumber: number
  feild: 'Иллюстрация' | 'Adobe'
  title: string
  introImageId: string
  introDescription: string
  introImageAlt: string
  discontAmount: number
  discontDeadline: string
  creditWas: number
  creditPrice: number
  description: Array<{ question: string, answer: string }>
  modulesDescription: TText | TText[]
  modules: Array<{ meta: TText | TText[], title: TText | TText[], content: TText | TText[], imageId: string, imageDesc: TText | TText[], imageAlt: string }>
  explainMedia: { type: 'image', imageId: string, imageAlt: string } | { type: 'video', title: string, src: string },
  promoVideo: { title: string, src: string }
  teachers: Array<{ title: TText | TText[], description: TText | TText[], imageId: string, imageAlt: string }>
  teacherGallery: Array<{imageId: string, imageAlt: string}>
  studentsWorks: Array<{imageId: string, imageAlt: string}>
  faq: Array<{ question: TText | TText[], answer: TText | TText[] }>
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
