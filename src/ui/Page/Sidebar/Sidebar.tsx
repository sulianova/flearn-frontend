import Tippy from '@tippyjs/react';
import classnames from 'classnames/bind';
import { useState } from 'react';
import { useParams } from 'react-router';

import { useURLSection } from 'hooks';
import { userService } from 'services/user.service';
import { URLSections } from 'router';

import LessonsPopup from 'components/LessonsPopup/LessonsPopup';
import Icon from 'ui/Icon/Icon';
import Link from 'ui/Link/Link';

import UserPopup from './UserPopup/UserPopup';
import classes from './Sidebar.module.scss';
import { frontendSettingsService } from 'services/frontendSettings.service';

const cx = classnames.bind(classes);

export default Sidebar;

function Sidebar() {
  const { courseId, lessonId } = useParams();
  const urlSection = useURLSection();
  const authedUser = userService.useAuthedUser();
  const { theme } = frontendSettingsService.useFrontendSettings();
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
        {urlSection.name === 'Study' && (
          <ul className={classes.items}>
            <li className={classes.item}>
              <span className={classes.iconWrapper}>
                <Link
                  className={classes.icon}
                  to={URLSections.Profile.to({ courseId: courseId! })}
                >
                  <Icon icon='Home' />
                </Link>
              </span>
            </li>
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
        )}
        {/* <ul className={classes.itemsSeparator}></ul> */}
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
            {(urlSection.name !== 'Course') && (urlSection.name !== 'Home') && (
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
                <li className={classes.item}>
                  <span className={classes.iconWrapper}>
                    <div
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
