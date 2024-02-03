import classNames from 'classnames/bind';
import { useState } from 'react';

import { formatI18nT, i18n } from 'shared';
import { formatDate } from 'utils';

import Link from 'ui/Link/Link';
import Form from './Form/Form';
import classes from './DecisionForm.module.scss';

import { URLSections } from 'types';
import type { ICourseData } from 'services/course.service';

export default DecisionForm;

const cx = classNames.bind(classes);

interface IProps {
  data: ICourseData
}

const t = formatI18nT('courseLanding.form');

function DecisionForm(props: IProps) {
  const { type, duration, creditWas, creditPrice, discontDeadline } = props.data;
  const [orderEmail, setOrderEmail] = useState<string | null>(null);

  const courseIsFree = Boolean(creditWas === 0 || (creditPrice === 0 && (discontDeadline === null || new Date() < discontDeadline)));

  return (
    <div className={classes.wrapper} id='decision-form'>
      <div className={cx({ block: true, blockDetails: true })}>
        <div className={classes.titleWrapper}>
          <div>
            <div className={classes.subtitle + ' s-text-24'}>{t(`title.${type}`)}</div>
            <h1 className={classes.title}>{t('courseName', { courseName: props.data.title })}</h1>
          </div>
          <div className={classes.courseInfo}>
            <div className={' s-text-18'}>{formatCourseDate(props.data.startDate, props.data.endDate)}</div>
            <div className={' s-text-18'}>{i18n.t(`duration.${duration.unit}`, { count: duration.value })}</div>
          </div>
        </div>
        <div className={classes.credit}>
          <s className={classes.creditWas + ' s-text-24'}>{formatCredit(props.data.creditWas)} &#8381;</s>
          <div className={classes.creditPrice + ' s-text-88'}>
            {formatCredit(props.data.creditPrice)} &#8381;
            <span className={classes.discount + ' s-text-18'}>{formatCourseDiscount(props.data.discontAmount)}</span>
          </div>
        </div>
      </div>
      <div className={classes.block}>
        {orderEmail ? <span>{t(`orderIsCreated.${type}.free=${courseIsFree}`, { email: orderEmail })}</span>
        : (<>
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
        </>)}
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
