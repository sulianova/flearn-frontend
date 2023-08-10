import * as images from 'assets/images';
import { HTMLAttributes } from 'react';
import type { IProps as ILinkProps } from 'ui/Link/Link';
export interface ICourseData {
  startDate: Date
  durationWeeks: number
  homeworksNumber: number
  videosNumber: number
  feild: 'Иллюстрация' | 'Adobe'
  title: string
  introDescription: string
  introImageSrc: keyof typeof images
  introImageAlt: string
  discontAmount: number
  discontDeadline: Date
  creditWas: number
  creditPrice: number
  description: Array<{ question: string, answer: string }>
  modulesDescription: TText | TText[]
  modules: Array<{ meta: TText | TText[], title: TText | TText[], content: TText | TText[], imageDesc: TText | TText[], imageSrc: keyof typeof images, imageAlt: string }>
  explainVideo: { title: string, src: string }
  promoVideo: { title: string, src: string }
  teachers: Array<{ title: TText | TText[], description: TText | TText[], imageSrc: keyof typeof images, imageAlt: string }>
  teacherGallery: Array<{imageSrc: keyof typeof images, imageAlt: string}>
  faq: Array<{ question: TText | TText[], answer: TText | TText[] }>
}

export type TText = string | IText;

export type IText = {
  content: TText | IText[]
} & (
  {
    tag: 'p'
    props?: HTMLAttributes<HTMLParagraphElement>
  }
  | {
    tag: 'span' | 'h1' | 'h2' | 'h3'
    props?: undefined
  }
  | {
    tag: 'a'
    props?: ILinkProps
  }
);

export interface ICourseInfo {
  startDate: Date
  durationWeeks: number
  title: string
}
