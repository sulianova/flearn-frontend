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
import { emailService } from 'services/email.service';
import { userService } from 'services/user.service';

export default ProgramIntro;

const t = formatI18nT('courseLanding.programIntro');

interface IProps {
  course: ICourseData
}

function ProgramIntro({ course }: IProps) {
  const { id: courseId, startDate, duration } = course;
  const firstLesson = lessonService.useLessons({ courseId, topicOrder: 1, orderInTopic: 1 }).at(0);
  const [popupVisible, setPopupVisible] = useState(false);
  const [isInterested, setIsInterested] = useState(false);

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
          close={() => {
            setPopupVisible(false);
            if (course.isUnderDevelopment) {
              setIsInterested(true);
            }
          }}
        />
      }
      <div className={classes.inner} id='program-intro'>
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
                {isInterested ? (
                    <div className={classes.actionsBtn}>
                      <div className={classes.text}>{'Заявка оставлена'}</div>
                    </div>
                  )
                  : !authService.isAuthenticated || (!course.isUnderDevelopment && !firstLesson) ? (
                    <div
                      className={classes.actionsBtn}
                      onClick={() => setPopupVisible(true)}
                    >
                      <div className={classes.text}>
                        {course.isUnderDevelopment ? 'Оставить заявку' : i18n.t('signUp')}
                      </div>
                    </div>
                  )
                  : !course.isUnderDevelopment ? (
                    <Link
                      className={classes.actionsBtn}
                      onClick={() => analyticsService.logEvent({ type: analyticsService.event.ButtonClickedStartStudy })}
                      to={URLSections.Study.to({ courseId, lessonId: firstLesson!.id })}
                    >
                      <div className={classes.text}>{i18n.t('signUp')}</div>
                    </Link>
                  )
                  : (
                    <div
                      className={classes.actionsBtn}
                      onClick={() => {
                        setIsInterested(true);
                        emailService.sendEmail({
                          type: emailService.EEmail.WantToBuyDummyCourse,
                          course: { isDummy: false, ...course },
                          requester: userService.authedUser ?? undefined,
                        });
                      }}
                    >
                      <div className={classes.text}>{'Оставить заявку'}</div>
                    </div>
                  )
                }
                {/* {authService.isAuthenticated && firstLesson ? (
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
                )} */}
              </div>
            </div>
        </div>
        {/* <div className={classes.cover}><Image src={course.introImage.imageSrc} alt={course.introImage.imageAlt}/></div> */}
      </div>
    </>
  );
}
