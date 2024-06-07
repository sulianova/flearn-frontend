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

import Tick from 'assets/images/Svg/Tick';
import Lock from 'assets/images/Svg/Lock';

import classnames from 'classnames/bind';
const cx = classnames.bind(classes);

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
          <div className={classes.header}>
            <div className={classes.title + ' s-text-36'}>Название темы</div>
          </div>
          {lessons ?
            lessons.map(lesson => (
              lesson.canBeAccessed ? (
                <div className={classes.navigationItem}>
                  <Link
                    key={lesson.id}
                    to={URLSections.Course.Lesson.to({ courseId, lessonId: lesson.id })}
                    onClick={onClose}
                    className={classes.navigationItemTitle + ' s-text-18'}
                  >
                     <span className={classes.navigationItemIndex}>1.</span>
                    {lesson.title}
                  </Link>
                </div>
              ) : (
                <div className={cx({ navigationItem: true, solved: false, disabled: true })}>
                  <div className={classes.navigationItemTitle + ' s-text-18'}>
                    <span className={classes.navigationItemIndex}>1.</span>
                    {lesson.title}
                  </div>
                  <div className={classes.navigationItemInfo}>
                    <div className={classes.infoItem}>
                      <div className={cx({ infoIcon: true, itemStatus: true})}>
                        <Lock/>
                        {/* <Tick/> */}
                      </div>
                    </div>
                  </div>
                </div>
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
