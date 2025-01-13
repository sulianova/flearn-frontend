import type { ILessonData } from 'services/lesson.service';

type TLessonId = string;
export type TProgress = {
  solved: boolean
  solvedQuizesAmount: number
  lastSolvedAt: Date
};
export type TProgressDB = {
  solved: boolean
  solvedQuizesAmount: number
  lastSolvedAt: string
};

export type TUserCourseProgress = {
  course: {
    lastVisitedAt: Date
  };
  lessons: Record<TLessonId, TProgress>;
};
export type TUserCourseProgressDB = {
  course: {
    lastVisitedAt: string
  };
  lessons: Record<TLessonId, TProgressDB>
};

export type TActionS = { type: 'updated', payload: { courseId: string, lessonId: string } };

export type  TCurrentCourseProgressBSValue = {
  dependencies: {
    userEmail: string
    courseId: string
  }
  value: TUserCourseProgress | undefined
};
