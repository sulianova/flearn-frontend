import { useState } from 'react';

import { authService } from 'services/auth.service';
import { type ICourseData } from 'services/course.service';
import { lessonService } from 'services/lesson.service';
import { URLSections } from 'router';

import Link from 'ui/Link/Link';

import SignupToCoursePopup from '../components/SignupToCoursePopup/SignupToCoursePopup';
import classes from './LandingBtn.module.scss';

interface IProps {
  course: ICourseData
}

export default function LandingBtn({ course }: IProps) {
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
      </div>
    </>
  );
}
