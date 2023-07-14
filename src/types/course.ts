import * as images from 'assets/images';
export interface ICourseData {
  startDate: Date
  durationWeeks: number
  homeworksNumber: number
  videosNumber: number
  feild: 'Иллюстрация' | 'Adobe'
  title: string
  introDescription: string
  discontAmount: number
  discontDeadline: Date
  creditWas: number
  creditPrice: number
  description: Array<{ question: string, answer: string }>
  modulesDescription: TText | TText[]
  modules: Array<{ meta: TText | TText[], title: TText | TText[], content: TText | TText[], imageDesc: TText | TText[], imageSrc: keyof typeof images, imageAlt: string }>
  teachers: Array<{ title: TText | TText[], description: TText | TText[], imageSrc: keyof typeof images, imageAlt: string }>
  teacherGallery: Array<{imageSrc: keyof typeof images, imageAlt: string}>
  faq: Array<{ question: TText | TText[], answer: TText | TText[] }>
}

export type TText = string | IText;

export interface IText {
  tag: 'p' | 'span' | 'h1' | 'h2' | 'h3'
  content: TText | IText[]
}

export interface ILessonData {
  type: 'Theory' | 'Practice'
}
