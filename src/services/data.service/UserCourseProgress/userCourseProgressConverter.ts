import { dateDB2FR, dateFR2DB } from 'services/utils/shared';
import { safeObjectKeys } from 'utils';

import type { TUserCourseProgress, TUserCourseProgressDB } from 'services/userCourseProgress.service';

export const userCourseProgressConverter = {
  toFirestore: (userCourseProgress: TUserCourseProgress): TUserCourseProgressDB => {
    const keys = safeObjectKeys(userCourseProgress);
    const entries = keys.map(k => {
      const v = userCourseProgress[k];
      return [k, { ...v, lastSolvedAt: dateFR2DB(v.lastSolvedAt) }] as const;
    });
    return Object.fromEntries(entries);
  },
  fromFirestore: (userCourseProgressDB: TUserCourseProgressDB): TUserCourseProgress => {
    const keys = safeObjectKeys(userCourseProgressDB);
    const entries = keys.map(k => {
      const v = userCourseProgressDB[k];
      return [k, { ...v, lastSolvedAt: dateDB2FR(v.lastSolvedAt) }] as const;
    });
    return Object.fromEntries(entries);
  },
};
