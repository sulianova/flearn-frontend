import { useEffect, useState } from 'react';
import type { Subscription } from 'rxjs';

import { formatI18nT } from 'shared';
import { addDays, formatDate } from 'utils';

import { homeworkService } from 'services';
import { userService } from 'services/user.service';

import Fallback from 'ui/Fallback';

import type { ILessonData } from 'types';

const t = formatI18nT('courseLesson');

interface IProps {
  lesson: ILessonData | undefined
  courseId: string | undefined
  lessonId: string | undefined
}

export default function useCanShowResults(props: Readonly<IProps>) {
  const { lesson, courseId, lessonId } = props;

  const authedUser = userService.useAuthedUser();
  const [sentForReviewHomeworksCount, setSentForReviewHomeworksCount] = useState<number | null>(null);
  const canShowResults = lesson && lesson.resultsEndDate < new Date() && sentForReviewHomeworksCount === 0
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

  const fallBackType = !lesson ? null:
    lesson.resultsEndDate > new Date() ? 'beforeDeadline'
    : addDays(lesson.resultsEndDate, 1) > new Date() ? 'deadlineDay'
    : 'pastDeadline';
  const fallBack = canShowResults || !fallBackType ? null : (
    <Fallback.Info>
      {t(`fallback:noResults:${fallBackType}`, {
        resultsEndDate: formatDate(lesson!.resultsEndDate, { timeZone: 'Europe/Moscow', wWeekDay: true })
      })}
    </Fallback.Info>
  );

  return { canShowResults, fallBack };
}
