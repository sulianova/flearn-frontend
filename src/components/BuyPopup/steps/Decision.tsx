import classnames from 'classnames/bind';

import { formatI18nT } from 'shared';

import classes from './Decision.module.scss';

import { formatCourseCredit, formatCourseDiscount, getDiscountedPrice, safeObjectKeys } from 'utils';
import { ICourseData, TCourseProductOptionTypes } from 'services/course.service';

const cx = classnames.bind(classes);
const t = formatI18nT('courseLanding.form');

interface IProps {
  course: ICourseData
  next: (productOptionType: TCourseProductOptionTypes) => void
}
const optionOrder = {
  OPTIMAL: 1,
  BASE: 2,
  EXTENDED: 3,
};

export default function Decision({ course, next }: IProps) {

  const optionTypes = safeObjectKeys(course.productOptions).sort((a, b) => optionOrder[a] - optionOrder[b]);
  const optionsNodes = optionTypes.map(type => {
    const option = course.productOptions[type]!;
    const { creditPrice, creditWas, discount } = getDiscountedPrice(course.discount, option);
    return (
      <div className={cx({ block: true, blockDetails: type === 'OPTIMAL' })} key={type}>
        {type === 'OPTIMAL' && (
          <div className={classes.buble}>самый популярный</div>
        )}
        <div className={classes.titleWrapper}>
          <h2 className={classes.courseName}>{t(`options.${type}.caption`)}</h2>
          <h1 className={classes.title}>{t(`options.${type}.title`)}</h1>
        </div>
        <div className={classes.credit}>
          <s className={classes.creditWas}>{formatCourseCredit(creditWas)} &#8381;</s>
          <div className={classes.creditPrice}>
            {formatCourseCredit(creditPrice)} &#8381;
            <span className={classes.discount}>{formatCourseDiscount(discount ?? 0)}</span>
          </div>
        </div>
        <button className={classes.btn} onClick={() => next(type)}>Перейти к оплате</button>
      </div>
    );
  });

  return (
    <>
      <div className={classes.commonFlowRow}>
        {/* <h2 className={classes.headerTitle}>Выберите, что больше подходит</h2> */}
        <div className={classes.wrapper}>
          {optionsNodes}
        </div>
      </div>
    </>
  );
}
