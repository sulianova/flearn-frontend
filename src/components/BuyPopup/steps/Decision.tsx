import classnames from 'classnames/bind';

import { formatI18nT } from 'shared';

import classes from '../BuyPopup.module.scss';

import type { IProps } from './types';
import { formatCourseCredit, formatCourseDiscount, getDiscountedPrice, safeObjectKeys } from 'utils';

const cx = classnames.bind(classes);
const t = formatI18nT('courseLanding.form');

export default function Decision({ course, next }: IProps) {

  const optionTypes = safeObjectKeys(course.productOptions);
  const optionsNodes = optionTypes.map(type => {
    const option = course.productOptions[type]!;
    const { creditPrice, creditWas, discount } = getDiscountedPrice(course.discount, option);
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
          <s className={classes.creditWas}>{formatCourseCredit(creditWas)} &#8381;</s>
          <div className={classes.creditPrice}>
            {formatCourseCredit(creditPrice)} &#8381;
            <span className={classes.discount}>{formatCourseDiscount(discount ?? 0)}</span>
          </div>
        </div>
        <button className={classes.btn} onClick={next}>Перейти к оплате</button>
      </div>
    );
  });

  return (
    <>
      <div className={classes.header}>
        <h2 className={classes.headerTitle}>Выберите, что больше подходит</h2>
      </div>
      <div className={classes.commonFlowRow}>
        <div className={classes.wrapper} id='decision-form'>
          {optionsNodes}
          {/* <div className={classes.block}>
            <div className={classes.titleWrapper}>
              <h2 className={classes.courseName}>самостоятельно</h2>
              <h1 className={classes.title}>{t(`title1.course`)}</h1>
            </div>
            <div className={classes.credit}>
              <s className={classes.creditWas}>3000 &#8381;</s>
              <div className={classes.creditPrice}>
                1000 &#8381;
                <span className={classes.discount}>-30%</span>
              </div>
            </div>
            <button className={classes.btn} onClick={next}>Перейти к оплате</button>
          </div>
          <div className={cx({ block: true, blockDetails: true })}>
            <div className={classes.buble}>самый популярный</div>
            <div className={classes.titleWrapper}>
              <h2 className={classes.courseName}>с обратной связью</h2>
              <h1 className={classes.title}>{t(`title2.course`)}</h1>
            </div>
            <div className={classes.credit}>
              <s className={classes.creditWas}>3000 &#8381;</s>
              <div className={classes.creditPrice}>
                1000 &#8381;
                <span className={classes.discount}>-30%</span>
              </div>
            </div>
            <button className={classes.btn} onClick={props.next}>Перейти к оплате</button>
          </div> */}
        </div>
      </div>
    </>
  );
}
