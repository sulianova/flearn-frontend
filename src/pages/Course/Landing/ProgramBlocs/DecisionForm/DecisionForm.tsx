import classNames from 'classnames/bind';
import { useState } from 'react';
import { connect } from 'react-redux';

import type { ICourseData } from 'services/course.service';
import type { IUserData } from 'services/user.service';
import { formatI18nT, i18n } from 'shared';
import { formatDate } from 'utils';

import Link from 'ui/Link/Link';

import Form from './Form/Form';
import FreeForm from './FreeForm/FreeForm';
import classes from './DecisionForm.module.scss';

import { type IRootState, URLSections } from 'types';

export default connect(mapStateToProps)(DecisionForm);

const cx = classNames.bind(classes);

interface IConnectedProps {
  user: IUserData | null
}

function mapStateToProps(state: IRootState): IConnectedProps {
  return {
    user: state.user.user ?? null,
  };
}
interface IProps extends IConnectedProps {
  course: ICourseData
}

const t = formatI18nT('courseLanding.form');

function DecisionForm({ course, user }: IProps) {
  const { type, duration, creditWas, creditPrice, discontDeadline } = course;
  const [orderEmail, setOrderEmail] = useState<string | null>(null);

  const courseIsFree = Boolean(creditWas === 0 || (creditPrice === 0 && (discontDeadline === null || new Date() < discontDeadline)));

  return (
    <div className={classes.wrapper} id='decision-form'>
      <div className={cx({ block: true, blockDetails: true })}>
        <div className={classes.titleWrapper}>
          <div>
            <div className={classes.subtitle + ' s-text-24'}>{t(`title.${type}`)}</div>
            <h1 className={classes.title}>{t('courseName', { courseName: course.title })}</h1>
          </div>
          <div className={classes.courseInfo}>
            <div className={' s-text-18'}>{formatCourseDate(course.startDate, course.endDate)}</div>
            <div className={' s-text-18'}>{i18n.t(`duration.${duration.unit}`, { count: duration.value })}</div>
          </div>
        </div>
        <div className={classes.credit}>
          <s className={classes.creditWas + ' s-text-24'}>{formatCredit(course.creditWas)} &#8381;</s>
          <div className={classes.creditPrice}>
            {formatCredit(course.creditPrice)} &#8381;
            <span className={classes.discount + ' s-text-18'}>{formatCourseDiscount(course.discontAmount)}</span>
          </div>
        </div>
      </div>
      <div className={classes.block}>
        {courseIsFree && user ? (
          <>
            <FreeForm userData={user} courseData={course} />
            <div className={classes.agreement}>
                <Link
                  className='link'
                  to={URLSections.Static.Oferta.index}
                  target='_blank'
                >
                  <span className={classes.agreementText + ' s-text-18'}>
                    {t('agreement')}
                  </span>
                </Link>
              </div>
          </>
        ) : (
          orderEmail ?
            (
              <span>{t(`orderIsCreated.free=${courseIsFree}`, { email: orderEmail })}</span>
            ) : (
            <>
              <Form
                onOrderCreated={({ email }) => setOrderEmail(email)}
                courseIsFree={courseIsFree}
              />
              <div className={classes.agreement}>
                <Link
                  className='link'
                  to={URLSections.Static.Oferta.index}
                  target='_blank'
                >
                  <span className={classes.agreementText + ' s-text-18'}>
                    {t('agreement')}
                  </span>
                </Link>
              </div>
            </>
          )
        )}
      </div>
    </div>
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
