import type { ILessonData, ILessonDataDB } from 'services/lesson.service/types';

import { articleDB2FR } from '../article';

export async function lessonDataDB2FR(lessonDB: ILessonDataDB): Promise<ILessonData> {
  return {
    ...lessonDB,
    content: await articleDB2FR(lessonDB.content, { courseId: lessonDB.courseId, folder: lessonDB.id }),
  };
}
