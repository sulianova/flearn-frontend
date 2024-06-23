import { useState } from 'react';

import { useURLSection } from 'hooks';
import { authService } from 'services/auth.service';
import { type ICourseData } from 'services/course.service';
import { frontendSettingsService } from 'services/frontendSettings.service';
import { lessonService } from 'services/lesson.service';
import { URLSections } from 'router';

import SignupToCoursePopup from 'components/SignupToCoursePopup/SignupToCoursePopup';
import Icon from 'ui/Icon/Icon';
import Link from 'ui/Link/Link';

import classes from './MobileBtn.module.scss';

interface IProps {
  course?: ICourseData
}

export default function MobileBtnContainer(props: IProps) {
  const urlSection = useURLSection();
  const { theme } = frontendSettingsService.useFrontendSettings();
  const changeTheme = () => frontendSettingsService.update({ theme: theme === 'light' ? 'dark' : 'light' });
  if (urlSection === 'Course' && props.course) {
    return <MobileBtnLanding course={props.course} changeTheme={changeTheme}/>
  }

  return (
    <div className={classes.__}>
      <div
        className={classes.settings}
        onClick={changeTheme}
      >
        <Icon icon='List'/>
      </div>
    </div>
  );
}

interface IMobileBtnLandingProps {
  course: ICourseData
  changeTheme: () => void
}

function MobileBtnLanding({ course, changeTheme }: IMobileBtnLandingProps) {
  const { id: courseId } = course;
  const firstLesson = lessonService.useLessons({ courseId, topicOrder: 1, orderInTopic: 1 }).at(0);
  const [popupVisible, setPopupVisible] = useState(false);

  return (
    <>
      {popupVisible &&
        <SignupToCoursePopup
          course={course}
          option={'OPTIMAL'}
          onClose={() => setPopupVisible(false)}
        />
      }
      <div className={classes.__}>
      {authService.isAuthenticated && firstLesson
        ? (
          <Link
            className={classes.btnLink}
            to={URLSections.Study.to({ courseId, lessonId: firstLesson.id })}
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
        )}
        <div className={classes.settings} onClick={changeTheme}>
          <Icon icon='List'/>
        </div>
      </div>
    </>
  );
}
