import type { ICourseData, TCourseProductOptionTypes } from 'services/course.service'
import type { ILessonData } from 'services/lesson.service'

export interface IEmailContact {
  email: string
  name?: string
}

export interface IEmail {
  to: IEmailContact[]
  from: IEmailContact
  subject: string
  html: string
}

export enum EEmail {
  WelcomeToCourse = 'WelcomeToCourse',
  WelcomeToPaidCourse = 'WelcomeToPaidCourse',
}


//////////////////// Emails props /////////////////

type TCommonProps = { to: IEmailContact };

export type TSendEmailProps =
  | TWelcomeToCourseProps
  | TWelcomeToPaidCourseProps;

export type TWelcomeToCourseProps = TCommonProps & {
  type: EEmail.WelcomeToCourse
  course: ICourseData
  firstLesson: ILessonData | undefined
};

export type TWelcomeToPaidCourseProps = TCommonProps & {
  type: EEmail.WelcomeToPaidCourse
  course: ICourseData
  paymentOption: 'CARD_RU' | 'PAYPAL'
  productOption: TCourseProductOptionTypes
  dateOfPaiment: Date
};
