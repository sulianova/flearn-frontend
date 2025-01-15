import { i18n } from 'shared';
import { useState } from 'react';

import { URLSections } from 'router';

import { type IUserData } from 'services/user.service';
import { type ILessonData } from 'services/lesson.service';
import { isIconPNG, type ICourseData } from 'services/course.service';
import { type TAccess } from 'services/userAccess.service';
import { TUserCourseProgress } from 'services/userCourseProgress.service';

import BuyPopup from 'components/BuyPopup/BuyPopup';
import SignupToCoursePopup from 'components/SignupToCoursePopup/SignupToCoursePopup';
import Link from 'ui/Link/Link';
import Icon from 'ui/Icon/Icon';

import classes from './Header.module.scss'
import Img from 'ui/Img/Img';

interface IProps {
  currentCourse: ICourseData
  courseLessons: Array<ILessonData & { solved: boolean, canBeAccessed: boolean }>
  currentCourseAccess: TAccess
  currentCourseProgress: TUserCourseProgress
  authedUser: IUserData | null
}

export default function Header(props: IProps) {
  const { currentCourse, courseLessons, currentCourseAccess, currentCourseProgress, authedUser } = props;
  const firstNotSolvedLesson = (courseLessons.find(l => !l.solved) || courseLessons.at(-1))!;
  const [signupToCoursePopupIsOpened, setSignupToCoursePopupIsOpened] = useState(false);
  const [buyCoursePopupIsOpened, setBuyCoursePopupIsOpened] = useState(false);

  return (
    <>
      <div className={classes.card}>
          <div className={classes.card__content}>
            <div className={classes.title}>{currentCourse.title}</div>
            <div className={classes.description}>{currentCourse.introDescription}</div>
            <div className={classes.metaData}>
              <div className={classes.metaData__item}>
                <span className={classes.metaData__text}>
                  {i18n.t(`duration.${currentCourse.metaData.lessonsDuration.unit}`, { count: currentCourse.metaData.lessonsDuration.value })}
                </span>
              </div>
              <div className={classes.metaData__item}>
                <span className={classes.metaData__text}>
                  {i18n.t('lesson.p', { count: currentCourse.metaData.lessonsAmount })}
                </span>
              </div>
            </div>
          </div>
          <div className={classes.card__image}>
            {isIconPNG(currentCourse.icon.icon) ? (
              <Img
                src={currentCourse.icon.icon}
                alt={currentCourse.icon.icon}
              />
            ) : (
              <Icon
                icon={currentCourse.icon.icon}
                color={currentCourse.icon.color}
              />
            )}
          </div>
          <div className={classes.actions}>
          <div className={classes.actionsBtn}>
            {!authedUser || currentCourseProgress.course.lastVisitedAt === null ?
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
