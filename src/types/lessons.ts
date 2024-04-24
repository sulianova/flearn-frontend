import { ICourseData } from 'services/course.service';

import { ILessonData } from './lesson';

export interface ILessonsData {
  lesson: ILessonData
  populate?: {
    course?: ICourseData
  }
}

export interface ILessonInfoDB {
  title: string
  lectureLink?: string
  homeworkLink?: string
  intensiveLink?: string
  resultsLink?: string
  week: number
}

export interface ILessonInfo {
  title: string
  lectureLink?: string
  homeworkLink?: string
  intensiveLink?: string
  resultsLink?: string
  week: number
  startDate: Date
  endDate: Date
}
