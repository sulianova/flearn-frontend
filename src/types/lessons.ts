import { ICourseInfo } from './course';

export interface ILessonsState {
  lessonsInfo: ILessonInfo[]
  courseInfo: ICourseInfo
}

export interface ILessonInfoDB {
  title: string
  lectureLink?: string
  homeworkLink?: string
  webinarLink?: string
  resultsLink?: string
  week: number
}

export interface ILessonInfo {
  title: string
  lectureLink?: string
  homeworkLink?: string
  webinarLink?: string
  resultsLink?: string
  week: number
  startDate: Date
  endDate: Date
}
