import { useEffect, useState } from 'react';
import classnames from 'classnames/bind';

import { useURLSection } from 'hooks';
import { authService } from 'services/auth.service';
import { type ICourseData } from 'services/course.service';
import { userService } from 'services/user.service';
import { frontendSettingsService } from 'services/frontendSettings.service';
import { lessonService } from 'services/lesson.service';
import { URLSections } from 'router';

import SignupToCoursePopup from 'components/SignupToCoursePopup/SignupToCoursePopup';
import Icon from 'ui/Icon/Icon';
import Link from 'ui/Link/Link';

import { EPageVariant } from '../Page';
import UserPopup from '../Sidebar/UserPopup/UserPopup';

import classes from './MobileBtn.module.scss';
const cx = classnames.bind(classes);

interface IProps {
  course?: ICourseData
  variant: EPageVariant
  visible: boolean
}

export default function MobileBtn({ course, variant, visible }: IProps) {
  const urlSection = useURLSection();
  const { theme } = frontendSettingsService.useFrontendSettings();
  const firstLesson = lessonService.useLessons({ courseId: course?.id, topicOrder: 1, orderInTopic: 1 }).at(0);
  const [popupVisible, setPopupVisible] = useState(false);
  const [userPopupVisible, setUserPopupVisible] = useState(false);
  const user = userService.useAuthedUser();


  useEffect(() => {
    if (!visible) {
      setUserPopupVisible(false);
    }
  }, [visible]);

  return (
    <>
      {popupVisible && course &&
        <SignupToCoursePopup
          course={course}
          option={'OPTIMAL'}
          onClose={() => setPopupVisible(false)}
        />
      }
      <div className={classes.__}>
          {urlSection === 'Course' && course && (
            authService.isAuthenticated && firstLesson
              ? (
                <Link
                  className={classes.btnLink}
                  to={URLSections.Study.to({ courseId: course.id, lessonId: firstLesson.id })}
                >
                  <div className={classes.text}>начать учиться</div>
                </Link>
              ) : (
                <div
                  className={classes.btnLink}
                  onClick={() => setPopupVisible(true)}
                >
                  <div className={classes.text}>начать учиться</div>
                </div>
              )
          )}
          <div className={classes.btnWrapper}>
            {variant === EPageVariant.LMS && (
                  <div
                    className={cx({ settings: true, open: userPopupVisible })}
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
              )}
              <div className={classes.settings} onClick={() => frontendSettingsService.update({ theme: theme === 'light' ? 'dark' : 'light' })}>
                <Icon icon='List'/>
              </div>
          </div>
      </div>
    </>
  );
}

