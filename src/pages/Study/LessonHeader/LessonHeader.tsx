import { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Subscription } from 'rxjs';

import { ILessonData } from 'services/lesson.service';
import { IUserData, userService } from 'services/user.service';
import { formatI18nT } from 'shared';
import { URLSections } from 'router';
import classNames from 'classnames/bind';

import Link from 'ui/Link/Link';

import classes from './LessonHeader.module.scss';

export default LessonHeader;

const t = formatI18nT('courseLesson');
const cx = classNames.bind(classes);

interface IProps {
  section: 'task' | 'results' | 'my-work'
}

function LessonHeader(props: IProps) {
  const { section } = props;
  const { courseId, lessonId } = useParams() as { courseId: string, lessonId: string };

  return (
    <div className={classes._}>
      {/* <div className={classes.navTubs}> */}
      <Link
        className={cx({ tabItem: true, active: section === 'task' })}
        to={URLSections.Study.to({ courseId, lessonId })}
      >
        {t('navTabsPractice')}
      </Link>
      <Link
        className={cx({ tabItem: true, active: section === 'results' })}
        to={URLSections.Study.Results.to({ courseId, lessonId, params: { limit: 4 } })}
      >
        {t('navTabsResults')}
      </Link>
      {/* </div> */}
    </div>
  );
}
