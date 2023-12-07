import type { HTMLAttributes } from 'react';
import type { IProps as ILinkProps } from 'ui/Link/Link';

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
  discontDeadline: Date
  creditWas: number
  creditPrice: number
  telegramLink: string
  description: Array<{ question: string, answer: string }>
  modulesDescription: TText | TText[]
  modules: Array<{ meta: TText | TText[], title: TText | TText[], content: TText | TText[], imageDesc: TText | TText[] } & TImageData>
  explainMedia: { type: 'image', imageId: string, imageSrc: string, imageAlt: string } | { type: 'video', title: string, src: string },
  promoVideo: { title: string, src: string }
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
  discontDeadline: string
  creditWas: number
  creditPrice: number
  telegramLink: string
  description: Array<{ question: string, answer: string }>
  modulesDescription: TText | TText[]
  modules: Array<{ meta: TText | TText[], title: TText | TText[], content: TText | TText[], imageDesc: TText | TText[] } & TImageDataDB>
  explainMedia: { type: 'image', imageId: string, imageAlt: string } | { type: 'video', title: string, src: string },
  promoVideo: { title: string, src: string }
  teachers: Array<{ title: TText | TText[], description: TText | TText[], imageId: string, imageAlt: string }>
  teacherGallery: Array<{imageId: string, imageAlt: string}>
  studentsWorks: Array<{imageId: string, imageAlt: string}>
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
)
| {
  tag: 'br'
};

export interface ICourseInfo {
  startDate: Date
  endDate: Date
  durationWeeks: number
  title: string
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
