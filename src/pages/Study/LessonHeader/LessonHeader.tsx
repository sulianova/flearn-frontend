import { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Subscription } from 'rxjs';

import { ILessonData } from 'services/lesson.service';
import { IUserData, userService } from 'services/user.service';
import { formatI18nT } from 'shared';
import { URLSections } from 'router';
import classNames from 'classnames/bind';

import Link from 'ui/Link/Link';

import useCanShowResults from '../useCanShowResults';
import useFilter from '../useFilter';

import classes from './LessonHeader.module.scss';

export default LessonHeader;

const t = formatI18nT('courseLesson');
const cx = classNames.bind(classes);

interface IProps {
  lesson: ILessonData
  section: 'task' | 'results' | 'my-work'
}

function LessonHeader(props: IProps) {
  const { lesson, section } = props;
  const { courseId, lessonId } = useParams() as { courseId: string, lessonId: string };
  const { filter } = useFilter();
  const { canShowResults } = useCanShowResults({ lesson, lessonId, courseId });

  const { userId } = filter;
  const [user, setUser] = useState<IUserData | null>(null);
  useEffect(() => {
    if (!userId) {
      setUser(null);
      return;
    }

    let subscription: Subscription;
    userService
      .getUserBS({ filter: { id: userId }})
      .then(bs => {
        subscription = bs.subscribe(action => {
          if (action && !(action instanceof Error) && action.users.length) {
            setUser(action.users[0]);
          }
        })
      });
  }, [userId]);

  const authedUser = userService.useAuthedUser();

  const taskTab = props.lesson.type === 'Practice' && (canShowResults || section !== 'task') &&(
    <Link
    className={cx({ tabItem: true, active: true })}
      to={URLSections.Study.to({ courseId, lessonId })}
    >
      {t('navTabsPractice')}
    </Link>
  );

  const resultsTab = props.lesson.type === 'Practice' && (canShowResults || section === 'results') && (
    <Link
    className={cx({ tabItem: true, active: true })}
      to={URLSections.Study.Results.to({ courseId, lessonId, params: { limit: 4 } })}
    >
      {t('navTabsResults')}
    </Link>
  );

  const tabs = [
    taskTab,
    resultsTab,
  ].filter(Boolean);

  return (
    <div className={classes._}>
      <div className={classes.navTubs}>
        {tabs.map((tab, i) => (
          <Fragment key={i}>
            {tab}
          </Fragment>
        ))}
      </div>
      <Link
        className={cx({ tabItem: true, active: props.section === 'task' })}
        to={URLSections.Study.to({ courseId, lessonId })}
      >
        {t('navTabsPractice')}
      </Link>
      <Link
        className={cx({ tabItem: true, active: props.section !== 'task' })}
        to={URLSections.Study.Results.to({ courseId, lessonId, params: { limit: 4 } })}
      >
        {t('navTabsResults')}
      </Link>
    </div>
  );
}
