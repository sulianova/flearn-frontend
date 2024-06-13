import classNames from 'classnames/bind';
import { useState } from 'react';

import type { ICourseData } from 'services/course.service';
import { userService, type IUserData } from 'services/user.service';
import { formatI18nT, i18n } from 'shared';
import { formatDate } from 'utils';

import classes from './DecisionForm.module.scss';

import SignupToCoursePopup from './SignupToCoursePopup/SignupToCoursePopup';

const cx = classNames.bind(classes);
interface IProps {
  course: ICourseData
}

const t = formatI18nT('courseLanding.form');

export default function DecisionForm({ course }: IProps) {
  const { type, duration, creditWas, creditPrice, discontDeadline } = course;
  const [popupOpen, setPopupOpen] = useState(false);
  const user = userService.useAuthedUser();

  return (
    <>
      <div className={classes.header}>
        <h2 className={classes.headerTitle}>Попробуйте любой формат курса бесплатно — выбрать один-единственный можно позже</h2>
      </div>
      <div className={classes.commonFlowRow}>
        <div className={classes.wrapper} id='decision-form'>
          <div className={classes.block}>
            <div className={classes.titleWrapper}>
              <h2 className={classes.courseName}>самостоятельно</h2>
              <h1 className={classes.title}>{t(`title1.${type}`)}</h1>
            </div>
            <div className={classes.credit}>
              <s className={classes.creditWas}>{formatCredit(course.creditWas)} &#8381;</s>
              <div className={classes.creditPrice}>
                {formatCredit(course.creditPrice)} &#8381;
                <span className={classes.discount}>{formatCourseDiscount(course.discontAmount)}</span>
              </div>
            </div>
            <button onClick={() => setPopupOpen(true)} className={classes.btn}>начать учиться</button>
          </div>
          <div className={cx({ block: true, blockDetails: true })}>
            <div className={classes.buble}>самый популярный</div>
            <div className={classes.titleWrapper}>
              <h2 className={classes.courseName}>с обратной связью</h2>
              <h1 className={classes.title}>{t(`title2.${type}`)}</h1>
            </div>
            <div className={classes.credit}>
              <s className={classes.creditWas}>{formatCredit(course.creditWas)} &#8381;</s>
              <div className={classes.creditPrice}>
                {formatCredit(course.creditPrice)} &#8381;
                <span className={classes.discount}>{formatCourseDiscount(course.discontAmount)}</span>
              </div>
            </div>
            <button onClick={() => setPopupOpen(true)} className={classes.btn}>начать учиться</button>
          </div>
        </div>
      </div>
      {popupOpen && (
        <SignupToCoursePopup
          course={course}
          user={user}
          onClose={() => setPopupOpen(false)}
        />
      )}
    </>
  );
}

function formatCredit(credit: number) {
  const thousands = String(credit).slice(0, -3);
  const theReast = String(credit).slice(-3);
  return `${thousands} ${theReast}`;
}

function formatCourseDiscount(discontAmount: number) {
  return `-${discontAmount}%`;
}

function formatCourseDate(startDate: Date, endDate: Date) {
  const startDateStr = formatDate(startDate, { timeZone: 'Europe/Moscow' });
  const endDateStr = formatDate(endDate, { timeZone: 'Europe/Moscow' });

  return `${startDateStr} – ${endDateStr}`;
}
