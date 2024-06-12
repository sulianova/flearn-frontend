import classnames from 'classnames/bind';

import { formatI18nT } from 'shared';

import classes from '../BuyPopup.module.scss';

import type { IProps } from './types';

const cx = classnames.bind(classes);
const t = formatI18nT('courseLanding.form');

export default function Decision(props: IProps) {
  return (
    <>
      <div className={classes.headerTitle}>
        <h2 className={' s-text-36'}>Выберите, что больше подходит</h2>
      </div>
      <div className={classes.commonFlowRow}>
        <div className={classes.wrapper} id='decision-form'>
          <div className={classes.block}>
            <div className={classes.titleWrapper}>
              <h2 className={classes.courseName + ' s-text-16'}>самостоятельно</h2>
              <h1 className={classes.title + ' s-text-24'}>{t(`title1.course`)}</h1>
            </div>
            <div className={classes.credit}>
              <s className={classes.creditWas + ' s-text-24'}>3000 &#8381;</s>
              <div className={classes.creditPrice}>
                1000 &#8381;
                <span className={classes.discount + ' s-text-18'}>-30%</span>
              </div>
            </div>
            <button className={classes.btn + ' s-text-21'} onClick={props.next}>Перейти к оплате</button>
          </div>
          <div className={cx({ block: true, blockDetails: true })}>
            <div className={classes.buble + ' s-text-21'}>самый популярный</div>
            <div className={classes.titleWrapper}>
              <h2 className={classes.courseName + ' s-text-16'}>с обратной связью</h2>
              <h1 className={classes.title + ' s-text-24'}>{t(`title2.course`)}</h1>
            </div>
            <div className={classes.credit}>
              <s className={classes.creditWas + ' s-text-24'}>3000 &#8381;</s>
              <div className={classes.creditPrice}>
                1000 &#8381;
                <span className={classes.discount + ' s-text-18'}>-30%</span>
              </div>
            </div>
            <button className={classes.btn + ' s-text-21'} onClick={props.next}>Перейти к оплате</button>
          </div>
        </div>
      </div>
    </>
  );
}
