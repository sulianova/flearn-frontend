import { useEffect } from 'react';

import { homeworkService } from 'services';
import type { ILessonData } from 'types';

interface IProps {
  courseId?: string
  lessonId?: string
  userId?: string
  lesson?: ILessonData
}

export default function useInitHomework(props: Readonly<IProps>) {
  const { courseId, lessonId, userId, lesson } = props;
  const lessonType = lesson?.type;

  useEffect(() => {
    if (!courseId || !lessonId || !userId || lessonType !== 'Practice') {
      return;
    }

    homeworkService.getHomework({ courseId, lessonId, userId })
      .catch(() => {
        // homework doesn't exist
        return homeworkService.createHomework({ courseId, lessonId, userId });
      })
      .catch(_err => { /* error already handled */});
  }, [courseId, lessonId, userId, lessonType]);
}
