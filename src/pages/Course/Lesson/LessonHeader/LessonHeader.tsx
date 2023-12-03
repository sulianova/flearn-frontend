import { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Subscription } from 'rxjs';

import { IUserData, userService } from 'services/user.service';
import { formatI18nT } from 'shared';

import useCanShowResults from '../useCanShowResults';
import useFilter from '../useFilter';

import Link from 'ui/Link/Link';

import classes from './LessonHeader.module.scss';

import { type ILessonData, URLSections } from 'types';

export default LessonHeader;

const t = formatI18nT('courseLesson');

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

  const taskTab = props.lesson.type === 'Practice' && (canShowResults || section !== 'task') && (
    <Link
      className={classes.type + ' nav-link s-text-18' + (section === 'task' ? ' isActive' : '')}
      to={URLSections.Course.Lesson.to({ courseId, lessonId })}
    >
      {t('navTubsPractice')}
    </Link>
  );

  const resultsTab = props.lesson.type === 'Practice' && (canShowResults || section === 'results') && (
    <Link
      className={classes.type + ' nav-link s-text-18' + (section === 'results' && !user ? ' isActive' : '')}
      to={URLSections.Course.Lesson.Results.to({ courseId, lessonId, params: { limit: 4 } })}
    >
      {t('navTubsResults')}
    </Link>
  );

  const resultTab = props.lesson.type === 'Practice' && section === 'results' && canShowResults && user && (
    <Link
      className={classes.type + ' nav-link s-text-18 isActive'}
      to={URLSections.Course.Lesson.Results.to({ courseId, lessonId, params: { limit: 4 } })}
    >
      {t('navTubsResults')}
    </Link>
  );

  const myWorkTab = props.lesson.type === 'Practice' && section === 'my-work' && (
    <span
      className={classes.type + ' nav-link s-text-18 isActive'}
    >
      {user?.displayName || user?.email}
    </span>
  );

  const tabs = [
    taskTab,
    resultsTab,
    resultTab,
    myWorkTab,
  ].filter(Boolean);

  return (
    <div className={classes._}>
      <Link
        className={classes.nav + ' nav-link s-text-18'} to={URLSections.Course.Lessons.to({ courseId })}
      >
        <span className='nav-link-text'>{(t('navToLessons'))}</span>
        <span className='nav-link-arrow'>&rarr;</span>
      </Link>
      <h1 className={classes.title + ' s-text-56'}>{lesson.title}</h1>
      {tabs.length > 1 && (
        <div className={classes.navTubs}>
          {tabs.map((tab, i) => (
            <Fragment key={i}>
              {tab}
            </Fragment>
          ))}
        </div>
      )}
    </div>
  );
}
