import classnames from 'classnames/bind';
import { useState } from 'react';
import { useParams } from 'react-router';

import { useURLSection } from 'hooks';
import { userService } from 'services/user.service';

import Portfolio from 'assets/images/Svg/Portfolio';
import LessonsPopup from 'components/LessonsPopup/LessonsPopup';
import Link from 'ui/Link/Link';

import UserPopup from './UserPopup/UserPopup';
import classes from './Sidebar.module.scss';
import { URLSections } from 'router';

const cx = classnames.bind(classes);

export default Sidebar;

function Sidebar() {
  const { courseId, lessonId } = useParams();
  const urlSection = useURLSection();
  const authedUser = userService.useAuthedUser();
  const [lessonsPopupVisible, setLessonsPopupVisible] = useState(false);
  const [userPopupVisible, setUserPopupVisible] = useState(false);

  return (
    <>
      <div className={classes.__}>
        <aside className={classes.container}>
          <ul className={classes.items}>
            <li className={classes.item}>
              <span className={classes.iconWrapper}>
                {(urlSection === 'Lessons' || urlSection === 'Lesson') && (
                  <Link
                    className={classes.icon}
                    to={urlSection === 'Lesson' && courseId ? URLSections.Course.Lessons.to({ courseId }) : URLSections.Home.index}
                  >
                    <Portfolio/>
                  </Link>
                )}
              </span>
            </li>
            <li className={classes.item}>
              <span className={classes.iconWrapper}>
                <Link
                  className={classes.icon}
                >
                  <Portfolio/>
                </Link>
              </span>
            </li>
            <li className={classes.item}>
              <span className={classes.iconWrapper}>
                <Link
                  className={classes.icon}
                >
                  <Portfolio/>
                </Link>
              </span>
            </li>
          </ul>
          <ul className={classes.items}>
            <li className={classes.item}>
              <span className={classes.iconWrapper}>
                <Link
                  className={classes.icon}
                >
                  <Portfolio/>
                </Link>
              </span>
            </li>
            <li className={classes.item}>
              <span className={classes.iconWrapper}>
               <div
                  className={classes.icon}
                  onClick={() => setLessonsPopupVisible(v => !v)}
                >
                  <Portfolio/>
                </div>
              </span>
            </li>
            <li className={cx({ item: true, open: userPopupVisible })}>
              {authedUser && userPopupVisible && (
                <UserPopup
                  user={authedUser}
                  close={() => setUserPopupVisible(false)}
                />
              )}
              <span className={classes.iconWrapper}>
              <div
                  className={classes.icon}
                  onClick={() => setUserPopupVisible(!userPopupVisible)}
                >
                  <Portfolio/>
                </div>
              </span>
            </li>
          </ul>
        </aside>
      </div>
      {courseId && lessonId && lessonsPopupVisible && (
        <LessonsPopup
          onClose={() => setLessonsPopupVisible(false)}
          courseId={courseId}
          openedLessonId={lessonId}
        />
      )}
    </>
  );
}
