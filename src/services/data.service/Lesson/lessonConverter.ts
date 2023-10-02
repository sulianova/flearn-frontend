
import { lessonDataDB2FR, lessonDataFR2DB } from 'services/utils/lesson';

import type { ILessonData, ILessonDataDB } from 'types';

export const lessonConverter = {
  toFirestore: (lessonData: ILessonData): ILessonDataDB => {
    return lessonDataFR2DB(lessonData);
  },
  fromFirestore: async (dataDB: ILessonDataDB, courseId: string): Promise<ILessonData> => {
    return await lessonDataDB2FR(dataDB, courseId);
  },
};
