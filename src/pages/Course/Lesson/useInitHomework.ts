import { useEffect } from 'react';

import { homeworkService } from 'services';

interface IProps {
  courseId?: string
  lessonId?: string
  userId?: string
}

export default function useInitHomework(props: Readonly<IProps>) {
  const { courseId, lessonId, userId } = props;
  useEffect(() => {
    if (!courseId || !lessonId || !userId) {
      return;
    }

    homeworkService.getHomework({ courseId, lessonId, userId })
      .catch(() => {
        // homework doesn't exist
        return homeworkService.createHomework({ courseId, lessonId, userId });
      })
      .catch(_err => { /* error already handled */});
  }, [courseId, lessonId, userId]);
}
