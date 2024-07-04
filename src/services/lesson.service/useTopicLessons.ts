import { useBehaviourSubjectValue } from 'hooks';

import type LessonService from '.';
import { useMemo } from 'react';

type TProps =
  | {
    topic?: string
    lessonId?: string
  };

export default function useTopicLessons(this: LessonService, { topic, lessonId }: TProps) {
  const courseLessons = useBehaviourSubjectValue(this._courseLessonsBS);
  return useMemo(() => {
    if (!courseLessons) {
      return null;
    }

    if (topic) {
      return courseLessons.filter(l => l.topic === topic);
    } else {
      const lesson = courseLessons.find(l => l.id === lessonId);
      if (!lesson) {
        return null;
      }

      return courseLessons.filter(l => l.topic === lesson.topic);
    }
  }, [courseLessons, topic, lessonId]);
}
