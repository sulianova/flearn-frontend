import { useEffect, useState } from 'react';
import type { Subscription } from 'rxjs';

import { homeworkService } from 'services';
import type { ILessonData } from 'types';

interface IProps {
  lesson: ILessonData
  courseId: string
  lessonId: string
}

export default function useCanShowResults(props: Readonly<IProps>) {
  const { lesson, courseId, lessonId } = props;

  const [sentForReviewHomeworksCount, setSentForReviewHomeworksCount] = useState<number | null>(null);
  const canShowResults = lesson?.resultsEndDate && lesson?.resultsEndDate < new Date() && sentForReviewHomeworksCount === 0;

  useEffect(() => {
    if (!courseId || !lessonId) {
      return;
    }

    let subscription: Subscription;
    homeworkService.getHomeworkBS({ filter: { courseId, lessonId, state: 'SENT_FOR_REVIEW' } })
      .then(bs => {
        subscription = bs.subscribe(e => {
          if (e && !(e instanceof Error)) {
            setSentForReviewHomeworksCount(e.homeworks.length)
          }
        });
      });

    return () => subscription?.unsubscribe();
  }, [courseId, lessonId]);

  return { canShowResults };
}
