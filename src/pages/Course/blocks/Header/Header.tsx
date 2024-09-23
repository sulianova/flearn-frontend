import { i18n } from 'shared';
import { useState } from 'react';

import { URLSections } from 'router';

import { type IUserData } from 'services/user.service';
import { type ILessonData } from 'services/lesson.service';
import { type ICourseData } from 'services/course.service';
import { type TAccess } from 'services/userAccess.service';

import BuyPopup from 'components/BuyPopup/BuyPopup';
import SignupToCoursePopup from 'components/SignupToCoursePopup/SignupToCoursePopup';
import Link from 'ui/Link/Link';
import Icon from 'ui/Icon/Icon';

import classes from './Header.module.scss'

interface IProps {
  currentCourse: ICourseData
  courseLessons: Array<ILessonData & { solved: boolean, canBeAccessed: boolean }>
  currentCourseAccess: TAccess | null
  authedUser: IUserData | null
}

export default function Header(props: IProps) {
  const { currentCourse, courseLessons, currentCourseAccess, authedUser } = props;
  const firstNotSolvedLesson = (courseLessons.find(l => !l.solved) || courseLessons.at(-1))!;
  const [signupToCoursePopupIsOpened, setSignupToCoursePopupIsOpened] = useState(false);
  const [buyCoursePopupIsOpened, setBuyCoursePopupIsOpened] = useState(false);

  return (
    <>
      <div className={classes.header}>
        <div className={classes.headerWrapper}>
          <div className={classes.headerContent}>
            <div className={classes.title}>{currentCourse.title}</div>
            <div className={classes.description}>{currentCourse.introDescription}</div>
            <div className={classes.metaData}>
              <div className={classes.metaData_Item}>
                <span className={classes.metaData_ItemText}>{i18n.t(`catalogue.card.info.${currentCourse.level}`)}</span>
              </div>
              <div className={classes.metaData_Item}>
                <span className={classes.metaData_ItemText}>
                  {i18n.t(`duration.${currentCourse.metaData.lessonsDuration.unit}`, { count: currentCourse.metaData.lessonsDuration.value })}
                </span>
              </div>
              <div className={classes.metaData_Item}>
                <span className={classes.metaData_ItemText}>
                  {i18n.t('lesson.p', { count: currentCourse.metaData.lessonsAmount })}
                </span>
              </div>
            </div>
          </div>
          <div className={classes.headerImage}>
            <Icon {...currentCourse.icon}/>
          </div>
          <div className={classes.shareLink}><Icon icon='Share'/></div>
        </div>
        <div className={classes.actions}>
          <div className={classes.actionsBtn}>
            {!authedUser || !currentCourseAccess ?
            (
              <div
                className={classes.currentLessonButton}
                onClick={() => setSignupToCoursePopupIsOpened(true)}
              >
                Начать учиться
              </div>
            ) : (currentCourseAccess !== 'FREE' || (firstNotSolvedLesson.isFree && currentCourseAccess === 'FREE')) ? (
              <Link
                className={classes.currentLessonButton}
                to={URLSections.Study.to({ courseId: currentCourse.id, lessonId: firstNotSolvedLesson.id })}
              >
                Продолжить учиться
              </Link>
            ) : (
              <div
                className={classes.currentLessonButton}
                onClick={() => setBuyCoursePopupIsOpened(true)}
              >
                Купить полный курс
              </div>
            )}
          </div>
        </div>
      </div>
      {signupToCoursePopupIsOpened && (
        <SignupToCoursePopup
          course={currentCourse}
          option='OPTIMAL'
          close={() => setSignupToCoursePopupIsOpened(false)}
        />
      )}
      {authedUser && buyCoursePopupIsOpened && (
        <BuyPopup
          user={authedUser}
          close={() => setBuyCoursePopupIsOpened(false)}
        />
      )}
    </>
  );
}
