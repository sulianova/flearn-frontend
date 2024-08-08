import type { IWelcomeToCourseEmailProps } from './emails/WelcomeToCourse';
import type { IWelcomeToPaidCourseEmailProps } from './emails/WelcomeToPaidCourse';
import type { IDiscontSolveFreeLessonsInWeekProps } from './emails/DiscontSolveFreeLessonsInWeek';
import type { IHomeworkSentForReviewProps } from './emails/HomeworkSentForReview';
import type { IHomeworkReviewedProps } from './emails/HomeworkReviewed';
import type { IHomeworkSentForReviewToReviewerProps } from './emails/HomeworkSentForReviewToReviewer';
import type { IHomeworkReviewedToReviewerProps } from './emails/HomeworkReviewedToReviewer';
import { IWantToBuyDummyCourseEmailProps } from './emails/WantToBuyDummyCourse';
import { IWelcomeToDummyCourseEmailProps } from './emails/WelcomeToDummyCourse';

export interface IEmailContact {
  email: string
  name?: string
}

export interface IEmail {
  to: [IEmailContact]
  from: IEmailContact
  subject: string
  html: string
}

export enum EEmail {
  WelcomeToCourse = 'WelcomeToCourse',
  WelcomeToPaidCourse = 'WelcomeToPaidCourse',
  DiscontSolveFreeLessonsInWeek = 'DiscontSolveFreeLessonsInWeek',
  HomeworkSentForReview = 'HomeworkSentForReview',
  HomeworkReviewed = 'HomeworkReviewed',
  HomeworkSentForReviewToReviewer = 'HomeworkSentForReviewToReviewer',
  HomeworkReviewedToReviewer = 'HomeworkReviewedToReviewer',
  WantToBuyDummyCourse = 'WantToBuyDummyCourse',
  WelcomeToDummyCourse = 'WelcomeToDummyCourse',
}


//////////////////// Emails props /////////////////

export type TCommonProps = { to: IEmailContact };

export type TSendEmailProps =
  | TWelcomeToCourseProps
  | TWelcomeToPaidCourseProps
  | TDiscontSolveFreeLessonsInWeekProps
  | THomeworkSentForReviewProps
  | THomeworkSentForReviewToReviewerProps
  | THomeworkReviewedProps
  | THomeworkReviewedToReviewerProps
  | TWantToBuyDummyCourseProps
  | TWelcomeToDummyCourseProps;

export type TWelcomeToCourseProps =
  & Omit<IWelcomeToCourseEmailProps, 'firstLesson'>
  & {
    type: EEmail.WelcomeToCourse
  };

export type TWelcomeToPaidCourseProps =
  & IWelcomeToPaidCourseEmailProps
  & {
    type: EEmail.WelcomeToPaidCourse
  };

export type TDiscontSolveFreeLessonsInWeekProps =
  & IDiscontSolveFreeLessonsInWeekProps
  & {
    type: EEmail.DiscontSolveFreeLessonsInWeek
  };

export type THomeworkSentForReviewProps =
  & IHomeworkSentForReviewProps
  & {
    type: EEmail.HomeworkSentForReview
  };

export type THomeworkReviewedProps =
  & IHomeworkReviewedProps
  & {
    type: EEmail.HomeworkReviewed
  };

export type THomeworkSentForReviewToReviewerProps =
  Omit<IHomeworkSentForReviewToReviewerProps, 'to'>
  & {
    type: EEmail.HomeworkSentForReviewToReviewer
  };

export type THomeworkReviewedToReviewerProps =
  Omit<IHomeworkReviewedToReviewerProps, 'to'>
  & {
    type: EEmail.HomeworkReviewedToReviewer
  };

export type TWantToBuyDummyCourseProps =
  Omit<IWantToBuyDummyCourseEmailProps, 'to'>
  & {
    type: EEmail.WantToBuyDummyCourse
  };

export type TWelcomeToDummyCourseProps =
  & IWelcomeToDummyCourseEmailProps
  & {
    type: EEmail.WelcomeToDummyCourse
  };
