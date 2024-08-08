import type { ILessonData, ILessonDataDB } from 'services/lesson.service/types';

import { articleFR2DB } from '../article';

export function lessonDataFR2DB(lesson: ILessonData): ILessonDataDB {
  return {
    ...lesson,
    content: articleFR2DB(lesson.content),
  };
}
