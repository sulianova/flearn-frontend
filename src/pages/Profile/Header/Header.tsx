import { i18n } from 'shared';
import { useState } from 'react';

import { URLSections } from 'router';

import { type IUserData } from 'services/user.service';
import { type ILessonData } from 'services/lesson.service';
import { type ICourseData } from 'services/course.service';
import { type TAccess } from 'services/userAccess.service';

import Link from 'ui/Link/Link';
import Icon from 'ui/Icon/Icon';
import BuyPopup from 'components/BuyPopup/BuyPopup';

import classes from './Header.module.scss'

interface IProps {
  authedUser: IUserData
  currentCourse: ICourseData
  courseLessons: Array<ILessonData & { solved: boolean, canBeAccessed: boolean }>
  currentCourseAccess: TAccess
}

export default function Header(props: IProps) {
  const { authedUser, currentCourse, courseLessons, currentCourseAccess } = props;
  const firstNotSolvedLesson = courseLessons.find(l => !l.solved);

  const [buyCoursePopupIsOpened, setBuyCoursePopupIsOpened] = useState(false);

  return (
    <div className={classes.headerWrapper}>
      <div className={classes.headerTitle}>Продолжить обучение</div>
      <div className={classes.header}>
        <div className={classes.headerImage}>
          <Icon {...currentCourse.icon}/>
        </div>
        <div className={classes.headerContent}>
          <div className={classes.title}>{currentCourse.title}</div>
          <div className={classes.meta}>
              <p className={classes.metaData_ItemText}>
                {i18n.t(`catalogue.card.info.${currentCourse.level}`)}
              </p>
              <p className={classes.metaData_ItemText}>
                {i18n.t(`duration.${currentCourse.metaData.lessonsDuration.unit}`, { count: currentCourse.metaData.lessonsDuration.value })}
              </p>
              <p className={classes.metaData_ItemText}>
                {i18n.t('lesson.p', { count: currentCourse.metaData.lessonsAmount })}
              </p>
          </div>
        </div>
      </div>
      {firstNotSolvedLesson ? (
          <div className={classes.actions}>
            <div className={classes.actionsBtn}>
              {!firstNotSolvedLesson.isFree && currentCourseAccess === 'FREE' && authedUser.role === 'user' ? (
                <div
                  className={classes.currentLessonButton}
                  onClick={() => setBuyCoursePopupIsOpened(true)}
                >
                  Купить полный курс
                </div>
              ) : (
                <Link
                  className={classes.currentLessonButton}
                  to={URLSections.Study.to({ courseId: currentCourse.id, lessonId: firstNotSolvedLesson.id })}
                >
                  Продолжить учиться
                </Link>
              )}
            </div>
          </div>
          ) : (
            <></>
          )}
          {buyCoursePopupIsOpened && (
            <BuyPopup
              course={currentCourse}
              user={authedUser}
              close={() => setBuyCoursePopupIsOpened(false)}
            />
          )}
    </div>
  );
}