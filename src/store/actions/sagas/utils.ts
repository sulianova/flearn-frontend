import { addDays } from 'utils';

import type { ICourseInfo, ILessonInfo, ILessonInfoDB } from 'types';

export function lessonInfoDB2FR(lessonsInfoDB: ILessonInfoDB, courseInfo: ICourseInfo): ILessonInfo {
  const startDate = addDays(courseInfo.startDate, + (lessonsInfoDB.week - 1) * 7);
  const endDate = addDays(courseInfo.startDate, + lessonsInfoDB.week * 7);
  const lessonsInfoFR: ILessonInfo = {
    ...lessonsInfoDB,
    startDate,
    endDate,
  };
  return lessonsInfoFR;
}
