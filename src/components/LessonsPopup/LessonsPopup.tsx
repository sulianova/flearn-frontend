import classnames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Subscription } from 'rxjs';

import { dataService } from 'services/data.service';
import { type ILessonData, lessonService } from 'services/lesson.service';
import { userService } from 'services/user.service';
import { URLSections } from 'router';

import Tick from 'assets/images/Svg/Tick';
import Lock from 'assets/images/Svg/Lock';
import Cross from 'assets/images/Svg/Cross';
import Popup from 'ui/Popup/Popup';
import Link from 'ui/Link/Link';
import Spinner from 'ui/Spinner/Spinner';

import classes from './LessonsPopup.module.scss';


const cx = classnames.bind(classes);

type TProps = {
  courseId: string
  onClose: () => void
} & (
  {
    lessons: (ILessonData & { solved: boolean, canBeAccessed: boolean })[]
  } | {
    openedLessonId: string
  }
)

export default function LessonsPopup(props: TProps) {
  const { courseId, onClose } = props;
  const authedUser = userService.useAuthedUser();
  const [lessons, setLessons] = useState<(ILessonData & { solved: boolean, canBeAccessed: boolean })[] | null>('lessons' in props ? props.lessons : null);

  const openedLessonId = 'openedLessonId' in props ? props.openedLessonId : null;
  useEffect(() => {
    if (openedLessonId === null || !authedUser) {
      return;
    }

    let cancelled = false;
    let subscription: Subscription;

    Promise.all([
      dataService.userCourseProgress.get(courseId, authedUser.email),
      dataService.lesson.get(courseId, openedLessonId)
    ])
      .then(([progress, lesson]) => {
        subscription = lessonService
          .getLessonBS({ courseId, topic: lesson.topic })
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

            setLessons(o.lessons.map(lesson => {
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
  }, [courseId, authedUser, openedLessonId]);

  return (
    <Popup>
      <div className={classes.__}>
        <div className={classes.close} onClick={onClose}>
          <Cross/>
        </div>
        <div className={classes.body}>
          <div className={classes.header}>
            <div className={classes.title}>{lessons?.[0]?.topic ?? ''}</div>
          </div>
          {lessons ?
            lessons.map(lesson => (
              <Link
                key={lesson.id}
                to={lesson.canBeAccessed ? URLSections.Course.Lesson.to({ courseId, lessonId: lesson.id }) : undefined}
                onClick={onClose}
                className={cx({ navigationItem: true, solved: lesson.solved, disabled: !lesson.canBeAccessed, active: lesson.id === openedLessonId })}
              >
                <div className={classes.navigationItemTitle}>
                    <span className={classes.navigationItemIndex}>{lesson.orderInTopic}.</span>
                    {lesson.title}
                </div>
                <div className={classes.navigationItemInfo}>
                  <div className={classes.infoItem}>
                    <div className={cx({ infoIcon: true, itemStatus: true })}>
                      {!lesson.canBeAccessed && <Lock/>}
                      {lesson.solved && <Tick/>}
                    </div>
                  </div>
                </div>
              </Link>
            )) : (
              <Spinner variant='local'/>
            )
          }
        </div>
      </div>
    </Popup>
  );
}
