import { courseDataDB2FR, courseDataFR2DB } from 'services/utils/course';

import type { ICourseData, ICourseDataDB } from 'types';

export const courseConverter = {
  toFirestore: (courseData: ICourseData): ICourseDataDB => {
    return courseDataFR2DB(courseData);
  },
  fromFirestore: async (courseDataDB: ICourseDataDB): Promise<ICourseData> => {
    return courseDataDB2FR(courseDataDB);
  },
};
