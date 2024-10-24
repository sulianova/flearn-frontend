import { useEffect, useState } from 'react';
import classnames from 'classnames/bind';

import { useIsMobile, useURLSection } from 'hooks';
import { IUserData } from 'services/user.service';
import { authService } from 'services';
import { courseService, type ICourseData } from 'services/course.service';
import { userService } from 'services/user.service';
import { lessonService } from 'services/lesson.service';
import { userCourseProgressService } from 'services/userCourseProgress.service';
import { URLSections } from 'router';

import SignupToCoursePopup from 'components/SignupToCoursePopup/SignupToCoursePopup';
import Icon from 'ui/Icon/Icon';
import Link from 'ui/Link/Link';

import { EPageVariant } from '../Page';
import UserPopup from '../Sidebar/UserPopup/UserPopup';
import MobileMenuPopup from '../Header/MobileMenuPopup/MobileMenuPopup';

import classes from './MobileBtn.module.scss';
import { analyticsService } from 'services/analytics.service';

const cx = classnames.bind(classes);

interface IProps {
  course?: ICourseData
  variant: EPageVariant
  visible: boolean
  onNotAuthedClick: () => void
}

export default function MobileBtn({ course, variant, visible, onNotAuthedClick }: IProps) {
  const userCourses = courseService.useUserCourses() ?? [];
  const lastStudiedCourse = userCourseProgressService.useLastStudiedCourse();
  const currentLesson = lessonService.useCurrentLesson() ?? undefined;
  const topicLessons = lessonService.useTopicLessons({ topic: currentLesson?.topic }) ?? [];
  
  const isMobile = useIsMobile();
  const urlSection = useURLSection();
  const firstLesson = lessonService.useLessons({ courseId: course?.id, topicOrder: 1, orderInTopic: 1 }).at(0);
  const [popupVisible, setPopupVisible] = useState(false);
  const [userPopupVisible, setUserPopupVisible] = useState(false);
  const user = userService.useAuthedUser();
  const [mobMenuIsOpened, setMobMenuIsOpened] = useState(false);

  useEffect(() => {
    if (!visible) {
      setUserPopupVisible(false);
    }
  }, [visible]);

  return (
    <>
      {isMobile && mobMenuIsOpened && (
        <MobileMenuPopup
          user={user}
          userCourses={userCourses}
          lastStudiedCourse={lastStudiedCourse}
          currentLesson={currentLesson}
          topicLessons={topicLessons}
          close={() => setMobMenuIsOpened(false)}
        />
      )}
      {popupVisible && course &&
        <SignupToCoursePopup
          course={course}
          option={'OPTIMAL'}
          close={() => setPopupVisible(false)}
        />
      }
      <div className={classes.wrapper}>
          {(
            urlSection.name === 'Home' && (authService.isAuthenticated ? (
              <Link
                className={classes.btnLink}
                to={URLSections.EmptyProfile.to()}
              >
                Продолжить учиться
              </Link>
            ) : (
              <div
                className={classes.btnLink}
                onClick={onNotAuthedClick}
              >
                Начать учиться бесплатно
              </div>
            ))
          )}
          <div className={classes.btnWrapperRight}>
              {urlSection.name !== 'Home' && user && (
                <div className={classes.menuBtn} onClick={() => setMobMenuIsOpened(o => !o)}>
                  <Icon icon='List'/>
                </div>
              )}
          </div>
      </div>
    </>
  );
}

