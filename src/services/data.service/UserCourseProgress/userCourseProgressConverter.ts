import { dateDB2FR, dateFR2DB } from 'services/utils/shared';
import { safeObjectKeys } from 'utils';

import type { TUserCourseProgress, TUserCourseProgressDB } from 'services/userCourseProgress.service';

export const userCourseProgressConverter = {
  toFirestore: (userCourseProgress: TUserCourseProgress): TUserCourseProgressDB => {
    const keys = safeObjectKeys(userCourseProgress.lessons);
    const entries = keys.map(k => {
      const v = userCourseProgress.lessons[k];
      return [k, { ...v, lastSolvedAt: dateFR2DB(v.lastSolvedAt) }] as const;
    });
    return {
      course: {
        lastVisitedAt: dateFR2DB(userCourseProgress.course.lastVisitedAt),
      },
      lessons: Object.fromEntries(entries),
    };
  },
  fromFirestore: (userCourseProgressDB: TUserCourseProgressDB): TUserCourseProgress => {
    const keys = safeObjectKeys(userCourseProgressDB.lessons);
    const entries = keys.map(k => {
      const v = userCourseProgressDB.lessons[k];
      return [k, { ...v, lastSolvedAt: dateDB2FR(v.lastSolvedAt) }] as const;
    });
    return {
      course: {
        lastVisitedAt: dateDB2FR(userCourseProgressDB.course.lastVisitedAt),
      },
      lessons: Object.fromEntries(entries),
    };
  },
};
