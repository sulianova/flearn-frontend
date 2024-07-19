import classnames from 'classnames/bind';

import { formatI18nT } from 'shared';

import classes from './Decision.module.scss';
import Icon from 'ui/Icon/Icon';

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
      <div className={cx({ block: true, blockDetails: type === 'OPTIMAL', active: false })} key={type}>
        <h2 className={classes.courseName}>
          {t(`options.${type}.caption`)}
        </h2>
        <dl className={classes.paymentSummary}>
          <dt>
            <div className={classes.creditPrice}>
              {formatCourseCredit(creditPrice)} &#8381;
            </div>
            <div className={classes.creditWas}>
              <s>{formatCourseCredit(creditWas)}</s>
            </div>
          </dt>
          <dt>
            <div className={classes.discountTags}>
              <span className={classes.discountTag}>{`−${discount ?? 0}%`}</span>
            </div>
          </dt>
        </dl>
        <button
          className={classes.cardBtn + ' btn'}
          onClick={() => next(type)}
        >
          Перейти к оплате
        </button>
        <h3 className={classes.title}>{t(`options.${type}.title`)}</h3>
        <ul className={classes.pricingCheckList}>
          <li className={classes.pricingCheckListItem}>
            <div className={classes.itemIcon}><Icon icon='TickInCircle'/></div>
            <div className={classes.itemText}>Чат в телеграмме для студентов</div>
          </li>
          <li className={classes.pricingCheckListItem}>
            <div className={classes.itemIcon}><Icon icon='TickInCircle'/></div>
            <div className={classes.itemText}>Бессрочный доступ к урокам и упражнениям</div>
          </li>
        </ul>
      </div>
    );
  });

  return (
    <>
      <div className={classes.commonFlowRow}>
        <div className={classes.header}>
          <div className={classes.headerTitle}>Выберите то, что больше подходит</div>
          <div className={classes.headerDescription}>Добавить обратную связь можно позже, когда поймете, что она нужна</div>
        </div>
        <div className={classes.wrapper}>
          {optionsNodes}
        </div>
      </div>
    </>
  );
}
