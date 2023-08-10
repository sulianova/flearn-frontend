import { ICourseInfo } from './course';

export interface ILessonInfo {
  title: string
  lectureLink?: string
  homeworkLink?: string
  webinarLink?: string
  resultsLink?: string
  dates: string
}

export interface ILessonsState {
  lessonsInfo: ILessonInfo[]
  courseInfo: ICourseInfo
}
