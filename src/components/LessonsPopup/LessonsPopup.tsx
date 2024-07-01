import classnames from 'classnames/bind';

import { type ILessonData, lessonService } from 'services/lesson.service';
import { URLSections } from 'router';

import Icon from 'ui/Icon/Icon';
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

  const openedLessonId = 'openedLessonId' in props ? props.openedLessonId : null;
  const fetchedTopicLessons = lessonService.useTopicLessons({ courseId, lessonId: 'openedLessonId' in props ? props.openedLessonId : undefined })
  const topicLessons = 'lessons' in props ? props.lessons : fetchedTopicLessons;

  return (
    <Popup
     children={close => (
      <div className={classes.__}>
        <div className={classes.close} onClick={() => close(onClose)}>
          <Icon icon='Cross'/>
        </div>
        <div className={classes.body}>
          <div className={classes.header}>
            <div className={classes.title}>{topicLessons?.[0]?.topic ?? ''}</div>
          </div>
          {topicLessons ?
            topicLessons.map(lesson => (
              <Link
                key={lesson.id}
                to={lesson.canBeAccessed ? URLSections.Study.to({ courseId, lessonId: lesson.id }) : undefined}
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
                      {!lesson.canBeAccessed && <Icon icon='Lock'/>}
                      {lesson.solved && <Icon icon='Tick'/>}
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
     )}
    />
  );
}
