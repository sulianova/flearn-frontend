import type { ICourseData, TCourseProductOptionTypes } from 'services/course.service'
import type { IHomeworkData } from 'services/homework.service'
import type { ILessonData } from 'services/lesson.service'
import type { IUserData } from 'services/user.service'

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
  DiscontSolveFreeLessonsInWeek = 'DiscontSolveFreeLessonsInWeek',
  HomeworkSentForReview = 'HomeworkSentForReview',
  HomeworkSentForReviewToReviewer = 'HomeworkSentForReviewToReviewer',
  HomeworkReviewed = 'HomeworkReviewed',
  HomeworkReviewedToReviewer = 'HomeworkReviewedToReviewer',
}


//////////////////// Emails props /////////////////

type TCommonProps = { to: IEmailContact };

export type TSendEmailProps =
  | TWelcomeToCourseProps
  | TWelcomeToPaidCourseProps
  | TDiscontSolveFreeLessonsInWeekProps
  | THomeworkSentForReviewProps
  | THomeworkSentForReviewToReviewerProps
  | THomeworkReviewedProps
  | THomeworkReviewedToReviewerProps;

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

export type TDiscontSolveFreeLessonsInWeekProps = TCommonProps & {
  type: EEmail.DiscontSolveFreeLessonsInWeek
  course: ICourseData
};

export type THomeworkSentForReviewProps = TCommonProps & {
  type: EEmail.HomeworkSentForReview
  course: ICourseData
  lesson: ILessonData
};

export type THomeworkReviewedProps = TCommonProps & {
  type: EEmail.HomeworkReviewed
  course: ICourseData
  lesson: ILessonData
  reviewLink: string
};

export type THomeworkSentForReviewToReviewerProps = {
  type: EEmail.HomeworkSentForReviewToReviewer
  course: ICourseData
  lesson: ILessonData
  homework: IHomeworkData
  homeworkUser: IUserData
};

export type THomeworkReviewedToReviewerProps = {
  type: EEmail.HomeworkReviewedToReviewer
  course: ICourseData
  lesson: ILessonData
  homeworkUser: IUserData
  reviewLink: string
};
