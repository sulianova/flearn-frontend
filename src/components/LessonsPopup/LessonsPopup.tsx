import Popup from 'ui/Popup/Popup';

import ModalCross from 'assets/images/Svg/ModalCross';

import { ILessonsData, URLSections, type ILessonData } from 'types';

import classes from './LessonsPopup.module.scss';
import Link from 'ui/Link/Link';
import { useEffect, useState } from 'react';
import Spinner from 'ui/Spinner/Spinner';
import { lessonService } from 'services/lesson.service';
import { Subscription } from 'rxjs';
import { dataService } from 'services';

type TProps = {
  courseId: string
  onClose: () => void
} & (
  {
    lessons: (ILessonData & { canBeAccessed?: boolean })[]
  } | {
    lessonIdOfLessonsWithSameTopic: string
  }
)

export default function LessonsPopup(props: TProps) {
  const { courseId, onClose } = props;
  const [lessons, setLessons] = useState<(ILessonData & { canBeAccessed?: boolean })[] | null>('lessons' in props ? props.lessons : null);

  const lessonIdOfLessonsWithSameTopic = 'lessonIdOfLessonsWithSameTopic' in props ? props.lessonIdOfLessonsWithSameTopic : null;
  useEffect(() => {
    if (lessonIdOfLessonsWithSameTopic === null) {
      return;
    }



    let cancelled = false;
    let subscription: Subscription;

    dataService.lesson.get(courseId, lessonIdOfLessonsWithSameTopic)
      .then(lesson => {
        subscription = lessonService
          .getLessonBS({ filter: { courseId, topic: lesson.topic } })
          .subscribe(o => {
            if (!o || o instanceof Error || cancelled) {
              return;
            }
    
            setLessons(o.lessons);
          })
      })
      .catch(err => { console.log(err) /* do nothing */ })

    return () => {
      cancelled = false;
      subscription.unsubscribe();
    };
  }, [courseId, lessonIdOfLessonsWithSameTopic]);

  return (
    <Popup>
      <div className={classes.__}>
        <div className={classes.close} onClick={onClose}>
          <ModalCross/>
        </div>
        <div className={classes.body}>
          {lessons ?
            lessons.map(lesson => (
              lesson.canBeAccessed ? (
                <Link
                  key={lesson.id}
                  to={URLSections.Course.Lesson.to({ courseId, lessonId: lesson.id })}
                  onClick={onClose}
                >
                  {lesson.title}
                </Link>
              ) : (
                <div>{lesson.title}</div>
              )
            )) : (
              <Spinner variant='local'/>
            )
          }
        </div>
      </div>
    </Popup>
  );
}
