import { ICourseInfo } from './course';

export interface ILessonInfo {
  title: string
}

export interface ILessonsState {
  lessonsInfo: ILessonInfo[]
  courseInfo: ICourseInfo
}
