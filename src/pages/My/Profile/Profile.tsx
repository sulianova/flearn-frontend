import { useEffect, useState } from 'react';
import type { Subscription } from 'rxjs';

import { DrawFreeCard } from 'assets/images';
import { formatI18nT } from 'shared';
import { addDays } from 'utils';

import { courseService, type  ICourseData } from 'services/course.service';
import type { IUserData } from 'services/user.service';

import classesCourseCard from './CourseCard.module.scss';
import classes from './Profile.module.scss';

const t = formatI18nT('my');

export default Profile;

interface IProps {
  user: IUserData
  data: ICourseData
}

function Profile(props: IProps) {
  const [courses, setCourses] = useState<ICourseData[]>();

  const userId = props.user.id;
  useEffect(() => {
    let subscription: Subscription;
    courseService
      .getCourseBS({ filter: { userId }})
      .then(bs => {
        subscription = bs.subscribe(action => {
          if (action && !(action instanceof Error)) {
            setCourses(action.courses);
          }
        })
      });
  }, [userId]);

  return (
    <div className='Profile'>
      <div className={classes.courseGroup}>
        <div className={classes.courseGroupTitle + ' s-text-21-uppercase'}>{t('profile.courseGroupTitle')}</div>
          {courses && courses.length ? renderCourses(courses) : (
            <p>You have no courses</p>
          )}
      </div>
    </div>
  );
}

function renderCourses(courses: ICourseData[]) {
  return courses.map(course => (
    <div className={classesCourseCard.item} key={course.id}>
      <div className={classesCourseCard.info}>
        <a className={classesCourseCard.titleLink + ' s-hoverable'} href='lessons.html' target='_blank'>
          <div className={classesCourseCard.title}>{course.title}</div>
          <div className={classesCourseCard.date + ' s-text-24'}>{formatEndDate(course.endDate)}</div>
        </a>
        <div className={classesCourseCard.cover}><img src={DrawFreeCard} alt='' decoding='async'/></div>
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

  return `${t('profile.endDate')}${endDateStr}`;
}