import { useEffect, useState } from 'react';
import type { Subscription } from 'rxjs';

import { dataService } from 'services/data.service';
import { userService } from 'services/user.service';

import type { ILessonData } from './types';
import type LessonService from '.';

interface IProps {
  courseId?: string
  lessonId?: string
}

export default function useTopicLessons(this: LessonService, props: IProps) {
  const { courseId, lessonId } = props;
  const authedUser = userService.useAuthedUser();
  const [topicLessons, setTopicLessons] = useState<(ILessonData & { solved: boolean, canBeAccessed: boolean })[]>();

  useEffect(() => {
    if (!courseId || !lessonId || !authedUser) {
      return;
    }

    let cancelled = false;
    let subscription: Subscription;

    Promise.all([
      dataService.userCourseProgress.get(courseId, authedUser.email),
      dataService.lesson.get(courseId, lessonId)
    ])
      .then(([progress, lesson]) => {
        subscription = this.getLessonBS({ courseId, topic: lesson.topic })
          .subscribe(o => {
            if (!o || o instanceof Error || cancelled) {
              return;
            }

            const sortedA = o.lessons.slice()
              .sort((a, b) => {
                const key = a.topicOrder != b.topicOrder ? 'topicOrder' : 'orderInTopic';
                return a[key] - b[key];
              });

            const firstNotLearnedLesson = sortedA.find(l => !progress[l.id]);

            setTopicLessons(o.lessons.map(lesson => {
              const solved = progress?.[lesson.id]?.solved ?? false;
              const canBeAccessed = !firstNotLearnedLesson ? true
                : firstNotLearnedLesson.topicOrder === lesson.topicOrder
                  ? firstNotLearnedLesson.orderInTopic >= lesson.orderInTopic
                  : firstNotLearnedLesson.topicOrder > lesson.topicOrder;
              return { ...lesson, canBeAccessed, solved };
            }).sort((a, b) => a.orderInTopic - b.orderInTopic));
          })
      })
      .catch(err => { console.log(err) /* do nothing */ })

    return () => {
      cancelled = false;
      subscription?.unsubscribe();
    };
  }, [courseId, authedUser, lessonId]);

  return topicLessons;
}
