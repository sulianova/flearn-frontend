import { useEffect, useState } from 'react';
import classnames from 'classnames/bind';

import { useIsMobile, useURLSection } from 'hooks';
import { authService } from 'services/auth.service';
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
}

export default function MobileBtn({ course, variant, visible }: IProps) {
  const userCourses = courseService.useUserCourses() ?? [];
  const firstNotSolvedLesson = userCourseProgressService.useFirstNotSolvedLesson();
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
          firstNotSolvedLesson={firstNotSolvedLesson}
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
      <div className={classes.__}>
          {urlSection.name === 'Course' && course && (
            authService.isAuthenticated && firstLesson
              ? (
                <Link
                  className={classes.btnLink}
                  onClick={() => analyticsService.logEvent({ type: analyticsService.event.ButtonClickedStartStudy })}
                  to={URLSections.Study.to({ courseId: course.id, lessonId: firstLesson.id })}
                >
                  <div className={classes.text}>Начать учиться бесплатно</div>
                </Link>
              ) : (
                <div
                  className={classes.btnLink}
                  onClick={() => setPopupVisible(true)}
                >
                  <div className={classes.text}>Начать учиться бесплатно</div>
                </div>
              )
          )}
          <div className={classes.btnWrapperRight}>
              {urlSection.name !== 'Course' && user && (
                <div className={classes.settings} onClick={() => setMobMenuIsOpened(o => !o)}>
                  <Icon icon='List'/>
                </div>
              )}
              {/* {urlSection.name === 'Profile' && (
                <div
                  className={cx({settings: true, open: userPopupVisible })}
                  onClick={() => setUserPopupVisible(!userPopupVisible)}
                >
                  {user && userPopupVisible && (
                    <UserPopup
                      user={user}
                      close={() => setUserPopupVisible(false)}
                    />
                  )}
                  <Icon icon='User'/>
                </div>
              )} */}
          </div>
          <div className={classes.btnWrapperLeft}>
              {/* {urlSection.name === 'Profile' && (
                <div
                  className={cx({settings: true, open: userPopupVisible })}
                  onClick={() => setUserPopupVisible(!userPopupVisible)}
                >
                  {user && userPopupVisible && (
                    <UserPopup
                      user={user}
                      close={() => setUserPopupVisible(false)}
                    />
                  )}
                  <Icon icon='User'/>
                </div>
              )} */}
          </div>
      </div>
    </>
  );
}

