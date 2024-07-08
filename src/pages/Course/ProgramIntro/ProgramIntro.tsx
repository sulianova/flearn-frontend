import { useState } from 'react';

import { formatI18nT, i18n } from 'shared';
import { authService } from 'services';
import type { ICourseData } from 'services/course.service';
import { lessonService } from 'services/lesson.service';
import { URLSections } from 'router';
import { formatDate } from 'utils';

import Image from 'ui/Img/Img';
import Link from 'ui/Link/Link';

import classes from './ProgramIntro.module.scss';
import SignupToCoursePopup from '../../../components/SignupToCoursePopup/SignupToCoursePopup';
import { analyticsService } from 'services/analytics.service';

export default ProgramIntro;

const t = formatI18nT('courseLanding.programIntro');

interface IProps {
  course: ICourseData
}

function ProgramIntro({ course }: IProps) {
  const { id: courseId, startDate, duration } = course;
  const firstLesson = lessonService.useLessons({ courseId, topicOrder: 1, orderInTopic: 1 }).at(0);
  const [popupVisible, setPopupVisible] = useState(false);

  const labels = [
    t('datesInfoLabel', { 
      startDate: formatDate(startDate, { timeZone: 'Europe/Moscow' }),
      durationInUnits: duration.value,
      unit: duration.unit,
    }),
  ];

  return (
    <>
      {popupVisible &&
        <SignupToCoursePopup
          course={course}
          option={'OPTIMAL'}
          close={() => setPopupVisible(false)}
        />
      }
      <div className={classes._} id='program-intro'>
        <div className={classes.inner}>
          <div className={classes.info}>
              <div className={classes.topContent}>
                <div className={classes.categories}>
                  {labels.map((label, i) => (
                    <div className={classes.categoriesItem} key={i}>{label}</div>
                  ))}
                </div>
                <h1 className={classes.title}>{course.title}</h1>
                <div className={classes.block}>{course.introDescription}</div>
                  </div>
              <div className={classes.bottomContent}>
                <div className={classes.actions}>
                  {authService.isAuthenticated && firstLesson ? (
                    <Link
                      className={classes.actionsBtn}
                      onClick={() => analyticsService.logEvent({ type: analyticsService.event.ButtonClickedStartStudy })}
                      to={URLSections.Study.to({ courseId, lessonId: firstLesson.id })}
                    >
                      <div className={classes.text}>{i18n.t('signUp')}</div>
                    </Link>
                  ) : (
                    <div
                      className={classes.actionsBtn}
                      onClick={() => setPopupVisible(true)}
                    >
                      <div className={classes.text}>{i18n.t('signUp')}</div>
                    </div>
                  )}
                </div>
              </div>
          </div>
          {/* <div className={classes.cover}><Image src={course.introImage.imageSrc} alt={course.introImage.imageAlt}/></div> */}
        </div>
      </div>
    </>
  );
}
