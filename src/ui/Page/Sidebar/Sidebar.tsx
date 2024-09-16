import Tippy from '@tippyjs/react';
import classnames from 'classnames/bind';
import { useState } from 'react';
import { useParams } from 'react-router';

import { useURLSection } from 'hooks';
import { frontendSettingsService } from 'services/frontendSettings.service';
import { userService } from 'services/user.service';
import { userCourseProgressService } from 'services/userCourseProgress.service';
import { URLSections } from 'router';

import LessonsPopup from 'components/LessonsPopup/LessonsPopup';
import Icon from 'ui/Icon/Icon';
import Link from 'ui/Link/Link';

import UserPopup from './UserPopup/UserPopup';
import classes from './Sidebar.module.scss';

const cx = classnames.bind(classes);

export default Sidebar;

function Sidebar() {
  const { courseId, lessonId } = useParams();
  const urlSection = useURLSection();
  const authedUser = userService.useAuthedUser();
  const { theme } = frontendSettingsService.useFrontendSettings();
  const lastStudiedCourse = userCourseProgressService.useLastStudiedCourse();
  const [lessonsPopupVisible, setLessonsPopupVisible] = useState(false);
  const [userPopupVisible, setUserPopupVisible] = useState(false);

  return (
    <>
      <div className={classes.__}>
        <aside className={classes.container}>
          <Link
            className={classes.header}
            to={URLSections.Home.index}
          >
            <Icon icon='Logo' />
          </Link>
        {(urlSection.name === 'Study' || urlSection.name === 'EmptyProfile' || urlSection.name === 'Courses' || urlSection.name === 'Course') && (
          <ul className={classes.items}>
            {(urlSection.name === 'Courses' || urlSection.name === 'Course') && authedUser && (
              <>
              <li className={classes.item}>
                <span className={classes.iconWrapper}>
                  <Link
                    className={classes.icon}
                    to={URLSections.EmptyProfile.to()}
                  >
                    <Icon icon='Home' />
                  </Link>
                </span>
              </li>
              </>
            )}
            {urlSection.name === 'EmptyProfile' && (
              <li className={classes.item}>
                <span className={classes.iconWrapper}>
                  <Link
                    className={classes.icon}
                    to={URLSections.EmptyProfile.to()}
                  >
                    <Icon icon='HomeFill' />
                  </Link>
                </span>
              </li>
            )}
            {urlSection.name === 'Study' && (
              <li className={classes.item}>
                <span className={classes.iconWrapper}>
                  <Link
                    className={classes.icon}
                    to={URLSections.EmptyProfile.to()}
                  >
                    <Icon icon='Home' />
                  </Link>
                </span>
              </li>
            )}
            <li className={classes.item}>
              <span className={classes.iconWrapper}>
                <Link
                  className={classes.icon}
                  to={URLSections.Courses.to()}
                >
                  <Icon icon={(urlSection.name === 'Courses' || urlSection.name === 'Course') ? 'CourseFill' : 'Course'} />
                </Link>
              </span>
            </li>
          </ul>
        )}
        {urlSection.name === 'Study' && (
          <>
            <ul className={classes.itemsSeparator}></ul>
            <ul className={classes.items}>
                <li className={classes.item}>
                  <span className={classes.iconWrapper}>
                  <div
                      className={classes.icon}
                      onClick={() => setLessonsPopupVisible(v => !v)}
                    >
                      <Icon icon='Lessons' />
                    </div>
                  </span>
                </li>
            </ul>
          </>
        )}
          <ul className={classes.items}>
            <li className={classes.item}>
              <span className={classes.iconWrapper}>
                <div
                  className={classes.icon}
                  onClick={() => frontendSettingsService.update({ theme: theme === 'dark' ? 'light' : 'dark' })}
                >
                   {theme === 'dark' ? (<Icon icon="Day"/>) :  (<Icon icon="Night"/>) }
                </div>
              </span>
            </li>
            {(
                 (urlSection.name === 'Courses' && authedUser)
              || (urlSection.name === 'Course' && authedUser)
              || urlSection.name === 'EmptyProfile'
              || urlSection.name === 'Profile'
              || urlSection.name === 'Study'
            ) && (
              <Tippy
                interactive
                placement='left-end'
                visible={userPopupVisible}
                onClickOutside={() => setUserPopupVisible(!userPopupVisible)}
                offset={[0, 0]}
                content={authedUser && (
                  <UserPopup
                    user={authedUser}
                    close={() => setUserPopupVisible(false)}
                  />
                )}
              >
                <li data-user-wrapper className={classes.item}>
                  <span className={classes.iconWrapper}>
                    <div
                      data-user
                      className={classes.icon}
                      onClick={() => setUserPopupVisible(!userPopupVisible)}
                    >
                      <Icon icon='User' />
                    </div>
                  </span>
                </li>
              </Tippy>
            )}
          </ul>
        </aside>
      </div>
      {courseId && lessonId && lessonsPopupVisible && (
        <LessonsPopup
          close={() => setLessonsPopupVisible(false)}
          courseId={courseId}
          lessonId={lessonId}
        />
      )}
    </>
  );
}
