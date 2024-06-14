import classNames from 'classnames/bind';
import { useState } from 'react';

import type { ICourseData, ICourseProductOption } from 'services/course.service';
import { userService, type IUserData } from 'services/user.service';
import { formatI18nT, i18n } from 'shared';
import { formatDate, safeObjectKeys } from 'utils';

import classes from './DecisionForm.module.scss';

import SignupToCoursePopup from './SignupToCoursePopup/SignupToCoursePopup';

const cx = classNames.bind(classes);
interface IProps {
  course: ICourseData
}

const t = formatI18nT('courseLanding.form');

export default function DecisionForm({ course }: IProps) {
  const { type, productOptions } = course;
  const [popupOption, setPopupOption] = useState<keyof ICourseData['productOptions'] | null>(null);
  const user = userService.useAuthedUser();

  const optionTypes = safeObjectKeys(productOptions);
  const optionsNodes = optionTypes.map(type => {
    const option = productOptions[type]!;
    return (
      <div className={cx({ block: true, blockDetails: type === 'OPTIMAL' })}>
        {type === 'OPTIMAL' && (
          <div className={classes.buble}>самый популярный</div>
        )}
        <div className={classes.titleWrapper}>
          <h2 className={classes.courseName}>{t(`options.${type}.caption`)}</h2>
          <h1 className={classes.title}>{t(`options.${type}.title`)}</h1>
        </div>
        <div className={classes.credit}>
          <s className={classes.creditWas}>{formatCredit(option.price)} &#8381;</s>
          <div className={classes.creditPrice}>
            {formatCredit(option.price)} &#8381;
            <span className={classes.discount}>{formatCourseDiscount(0)}</span>
          </div>
        </div>
        <button onClick={() => setPopupOption(type)} className={classes.btn}>начать учиться</button>
      </div>
    );
  })

  return (
    <>
      <div className={classes.header}>
        <h2 className={classes.headerTitle}>Попробуйте любой формат курса бесплатно — выбрать один-единственный можно позже</h2>
      </div>
      <div className={classes.commonFlowRow}>
        <div className={classes.wrapper} id='decision-form'>
          {optionsNodes}
        </div>
      </div>
      {popupOption && (
        <SignupToCoursePopup
          course={course}
          option={popupOption}
          user={user}
          onClose={() => setPopupOption(null)}
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
