import classnames from 'classnames/bind';
import { useMemo } from 'react';

import { lessonService } from 'services/lesson.service';
import { URLSections } from 'router';

import Icon from 'ui/Icon/Icon';
import Popup from 'ui/Popup/Popup';
import Link from 'ui/Link/Link';
import Spinner from 'ui/Spinner/Spinner';

import classes from './LessonsPopup.module.scss';


const cx = classnames.bind(classes);

type TProps = {
  courseId: string
  close: () => void
} & (
  {
    topic?: string
    lessonId?: string
  }
)

export default function LessonsPopup(props: TProps) {
  const { courseId, close } = props;

  const topicLessons = lessonService.useTopicLessons(props) ?? [];
  const isUnderDevelopment = useMemo(() => topicLessons.some(l => l.isUnderDevelopment), [topicLessons]);

  return (
    <Popup
      close={close}
      children={startClosingProcess => (
        <div className={classes.__}>
          <div className={classes.close} onClick={startClosingProcess}>
            <Icon icon='Cross'/>
          </div>
          <div className={classes.body}>
            <div className={classes.header}>
              <div className={classes.title}>{topicLessons?.[0]?.topic ?? ''}{isUnderDevelopment && ' (Скоро будет)'}</div>
            </div>
            {topicLessons ?
              topicLessons.map(lesson => (
                <Link
                  key={lesson.id}
                  to={lesson.canBeAccessed ? URLSections.Study.to({ courseId, lessonId: lesson.id }) : undefined}
                  onClick={startClosingProcess}
                  className={cx({ navigationItem: true, solved: lesson.solved, disabled: !lesson.canBeAccessed, active: lesson.id === props.lessonId })}
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
