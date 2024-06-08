
import { lessonDataDB2FR, lessonDataFR2DB } from 'services/utils/lesson';

import type { ILessonData, ILessonDataDB } from 'services/lesson.service';

export const lessonConverter = {
  toFirestore: (lessonData: ILessonData): ILessonDataDB => {
    return lessonDataFR2DB(lessonData);
  },
  fromFirestore: async (dataDB: ILessonDataDB): Promise<ILessonData> => {
    return await lessonDataDB2FR(dataDB);
  },
};
