import { TURLSectionObj } from 'router';
import { ILessonFilter } from 'services/data.service/Lesson';
import { TSurvey } from 'services/surveyAnswers.service';
import { IUserData } from 'services/user.service';
import { TAccess } from 'services/userAccess.service';
import { ECommonErrorTypes } from 'types';
import type { IArticleContent, IArticleContentDB } from 'types';
import { TIcon } from 'ui/Icon/Icon';

interface ILessonDataCommon {
  id: string
  courseId: string
  title: string
  type: 'Theory' | 'Practice'
  icon: TIcon
  topic: string
  topicOrder: number
  topicIcon: TIcon
  orderInTopic: number
  duration: {
    unit: 'minutes' | 'hours'
    value: number
  }
  isFree: boolean
  isUnderDevelopment: boolean
  survey?: TSurvey
}

export interface ILessonData extends ILessonDataCommon {
  content: IArticleContent
}

export interface ILessonDataDB extends ILessonDataCommon {
  content: IArticleContentDB
}

export interface IFetchLessonsProps extends ILessonFilter {}

export type TSource = 'remote' | 'local';

export type TCourseLessonsRawBSDependencies = {
  source: TSource
  section: TURLSectionObj
}

export type TCourseLessonsRawBSValue = {
  lessons: Array<ILessonData> | null
  dependencies: TCourseLessonsRawBSDependencies | null
}

export type TCourseLessonsBSDependencies = {
  authedUser: IUserData | null
  courseAccess: TAccess | null
}

export type TCourseLessonsBSValue = {
  lessons: Array<ILessonData & { solved: boolean, canBeAccessed: boolean }> | null
  dependencies: TCourseLessonsBSDependencies | null
}

export type TActionS = { type: 'updated' };

export type TLessonError =
  | ECommonErrorTypes.Restricted
  | ECommonErrorTypes.Unauthorized
  | ECommonErrorTypes.DataIsCorrupted
  | ECommonErrorTypes.FailedToFindData
  | ECommonErrorTypes.Other;

interface MyError extends Error {
  ErrorType: TLessonError
}

export type TActionBS =
  | null
  | { lessons: ILessonData[] }
  | MyError;
