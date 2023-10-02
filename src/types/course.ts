import type { HTMLAttributes } from 'react';
import type { IProps as ILinkProps } from 'ui/Link/Link';

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
  explainVideo: { title: string, src: string }
  promoVideo: { title: string, src: string }
  teachers: Array<{ title: TText | TText[], description: TText | TText[], imageId: string, imageSrc: string, imageAlt: string }>
  teacherGallery: Array<{imageId: string, imageSrc: string, imageAlt: string}>
  faq: Array<{ question: TText | TText[], answer: TText | TText[] }>
}

export interface ICourseDataDB {
  id: string
  startDate: string
  endDate: string
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
  explainVideo: { title: string, src: string }
  promoVideo: { title: string, src: string }
  teachers: Array<{ title: TText | TText[], description: TText | TText[], imageId: string, imageAlt: string }>
  teacherGallery: Array<{imageId: string, imageAlt: string}>
  faq: Array<{ question: TText | TText[], answer: TText | TText[] }>
}

export type TText = string | IText;

export type IText = {
  content: TText | IText[]
} & (
  {
    tag: 'p'
    props?: HTMLAttributes<HTMLParagraphElement>
  } | {
    tag: 'span'
    props?: HTMLAttributes<HTMLSpanElement>
  } | {
    tag: 'a'
    props?: ILinkProps
  }
);

export interface ICourseInfo {
  startDate: Date
  endDate: Date
  durationWeeks: number
  title: string
}
