import { useEffect, useState } from 'react';
import type { Subscription } from 'rxjs';

import { formatI18nT } from 'shared';

import { homeworkService } from 'services/homework.service';
import { ILessonData } from 'services/lesson.service';
import { userService } from 'services/user.service';

import Fallback from 'ui/Fallback';

const t = formatI18nT('courseLesson');

interface IProps {
  lesson: ILessonData | null
  courseId: string | undefined
  lessonId: string | undefined
}

export default function useCanShowResults(props: Readonly<IProps>) {
  const { lesson, courseId, lessonId } = props;

  const authedUser = userService.useAuthedUser();
  const [sentForReviewHomeworksCount, setSentForReviewHomeworksCount] = useState<number | null>(null);
  const canShowResults = (lesson && /*lesson.resultsEndDate < new Date() &&*/ sentForReviewHomeworksCount === 0)
    || authedUser?.role === 'support';

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

  const fallBack = canShowResults ? null : (
    <Fallback.Info>
      {t(`fallback.noResults`)}
    </Fallback.Info>
  );

  return { canShowResults, fallBack };
}
