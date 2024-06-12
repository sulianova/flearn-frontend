import classnames from 'classnames/bind';

import { formatI18nT } from 'shared';

import classes from '../BuyPopup.module.scss';

import type { IProps } from './types';

const cx = classnames.bind(classes);
const t = formatI18nT('courseLanding.form');

export default function Decision(props: IProps) {
  return (
    <>
      <div className={classes.header}>
        <h2 className={classes.headerTitle}>Выберите, что больше подходит</h2>
      </div>
      <div className={classes.commonFlowRow}>
        <div className={classes.wrapper} id='decision-form'>
          <div className={classes.block}>
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
            <button className={classes.btn} onClick={props.next}>Перейти к оплате</button>
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
          </div>
        </div>
      </div>
    </>
  );
}
