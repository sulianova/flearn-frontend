import { useEffect, useState } from 'react';
import type { Subscription } from 'rxjs';

import { courseService, type TCourseState, type  ICourseData } from 'services/course.service';
import { type IUserData } from 'services/user.service';
import { formatI18nT } from 'shared';
import { URLSections } from 'types';
import { addDays } from 'utils';

import Fallback from 'ui/Fallback';
import Img from 'ui/Img/Img';
import Link from 'ui/Link/Link';

import useFallback from './useFallback';

import classesCourseCard from './CourseCard.module.scss';
import classes from './Profile.module.scss';

const t = formatI18nT('my.profile');

export default Profile;

interface IProps {
  user: IUserData
  data: ICourseData
}

function Profile(props: IProps) {
  const [courses, setCourses] = useState<ICourseData[]>();
  const [courseState, setCourseState] = useState<TCourseState>({ type: 'pending' });

  const userId = props.user.id;
  useEffect(() => {
    let subscription: Subscription;
    courseService
      .getCourseBS({ filter: { userId }})
      .then(bs => {
        subscription = bs.subscribe(action => {
          if (action && !(action instanceof Error)) {
            setCourses(action.courses);
            setCourseState({ type: 'idle' });
          } else if (action instanceof Error) {
            setCourses(undefined);
            setCourseState({ type: 'error', error: action, errorType: action.ErrorType });
          }
        })
      });
  }, [userId]);

  const fallback = useFallback({ courseState });

  if (!courses) {
    return fallback;
  }

  if (!courses.length) {
    return (
      <Fallback.Info fullPage={false}>
        <p>{t('noCoursesFallback.title')}</p>
        <p>
          <Link className='link' to={URLSections.FreeZone.index}>
            {t('noCoursesFallback.suggestionLink')}
          </Link>
          {t('noCoursesFallback.suggestionRest')}
        </p>
      </Fallback.Info>
    );
  }

  return (
    <div className='Profile'>
      <div className={classes.courseGroup}>
        <div className={classes.courseGroupTitle + ' s-text-21-uppercase'}>
          {t('courseGroupTitle')}
        </div>
        {renderCourses(courses)}
      </div>
    </div>
  );
}

function renderCourses(courses: ICourseData[]) {
  return courses.map(course => (
    <div className={classesCourseCard.item} key={course.id}>
      <div className={classesCourseCard.info}>
        <Link
          className={classesCourseCard.titleLink + ' s-hoverable'}
          to={URLSections.Course.Lessons.to({ courseId: course.id })}
          block
        >
          <div className={classesCourseCard.title}>{course.title}</div>
          <div className={classesCourseCard.date + ' s-text-24'}>{formatEndDate(course.endDate)}</div>
        </Link>
        <div className={classesCourseCard.cover}>
          <Img
            src={course.introImageSrc}
            alt={course.introImageAlt}
          />
        </div>
      </div>
    </div>
  ));
}

function formatEndDate(endDate: Date) {
  const endDateOfAccess = addDays(endDate, 14);
  const endDateStr = endDateOfAccess.toLocaleDateString(
    ['ru-RU'],
    { month: 'long', day: 'numeric' }
  );

  return `${t('endDate')}${endDateStr}`;
}