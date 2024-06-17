import type { ILessonData } from 'services/lesson.service';

type TLessonId = string;
export type TProgress = {
  solved: boolean
  lastSolvedAt: Date
};
export type TProgressDB = {
  solved: boolean
  lastSolvedAt: string
};

export type TUserCourseProgress = Record<TLessonId, TProgress>;
export type TUserCourseProgressDB = Record<TLessonId, TProgressDB>;

export type TActionS = { type: 'updated', payload: { courseId: string, lessonId: string } };

export type TActionBS =
  | null
  | ILessonData
  | Error;
