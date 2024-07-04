import type { IWelcomeToCourseEmailProps } from './emails/WelcomeToCourse';
import type { IWelcomeToPaidCourseEmailProps } from './emails/WelcomeToPaidCourse';
import type { IDiscontSolveFreeLessonsInWeekProps } from './emails/DiscontSolveFreeLessonsInWeek';
import type { IHomeworkSentForReviewProps } from './emails/HomeworkSentForReview';
import type { IHomeworkReviewedProps } from './emails/HomeworkReviewed';
import type { IHomeworkSentForReviewToReviewerProps } from './emails/HomeworkSentForReviewToReviewer';
import type { IHomeworkReviewedToReviewerProps } from './emails/HomeworkReviewedToReviewer';

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
  HomeworkReviewed = 'HomeworkReviewed',
  HomeworkSentForReviewToReviewer = 'HomeworkSentForReviewToReviewer',
  HomeworkReviewedToReviewer = 'HomeworkReviewedToReviewer',
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
  | THomeworkReviewedToReviewerProps;

export type TWelcomeToCourseProps = TCommonProps
  & Omit<IWelcomeToCourseEmailProps, 'firstLesson'>
  & {
    type: EEmail.WelcomeToCourse
  };

export type TWelcomeToPaidCourseProps = TCommonProps
  & IWelcomeToPaidCourseEmailProps
  & {
    type: EEmail.WelcomeToPaidCourse
  };

export type TDiscontSolveFreeLessonsInWeekProps = TCommonProps
  & IDiscontSolveFreeLessonsInWeekProps
  & {
    type: EEmail.DiscontSolveFreeLessonsInWeek
  };

export type THomeworkSentForReviewProps = TCommonProps
  & IHomeworkSentForReviewProps
  & {
    type: EEmail.HomeworkSentForReview
  };

export type THomeworkReviewedProps = TCommonProps
  & IHomeworkReviewedProps
  & {
    type: EEmail.HomeworkReviewed
  };

export type THomeworkSentForReviewToReviewerProps =
  IHomeworkSentForReviewToReviewerProps
  & {
    type: EEmail.HomeworkSentForReviewToReviewer
  };

export type THomeworkReviewedToReviewerProps =
  IHomeworkReviewedToReviewerProps
  & {
    type: EEmail.HomeworkReviewedToReviewer
  };
