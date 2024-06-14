import { memo } from 'react';


import { formatI18nT, i18n } from 'shared';
import { formatDate } from 'utils';
import useCountDown from './useCountDown';

import classes from './DiscountBanner.module.scss';

const t = formatI18nT('courseLanding.discountBanner');

export default memo(DiscountBanner);

interface IProps {
  discontAmount: number
  discontDeadline: Date
}

function DiscountBanner(props: IProps) {
  const { discontDeadline } = props;
  const { days, hours, minutes, seconds } = useCountDown({ deadline: discontDeadline });

  return (
    <div className={classes._}>
        <div className={classes.discountWrapper} /*href='#decision-form'*/>
          <h2 className={classes.title}>Запишитесь заранее и сэкономьте</h2>
          <div className={classes.descriptionWrapper}>
            {t('description1')}
            <span className={classes.count}>
              {`${props.discontAmount}%`}
            </span>
            {t('description2')}
            <span className={classes.count}>
              {t('description3', {
                day: i18n.t('day.p', { count: days }),
                days,
                hours: numeric(hours),
                minutes: numeric(minutes),
                seconds: numeric(seconds),
              })}
            </span>
            {/* {t('description', { discountAmount: props.discontAmount }) }
            <span className={classes.count}>{` ${numeric(days)} день `}</span>
            <span className={classes.count}>{`${numeric(hours)}:`}</span>
            <span className={classes.count}>{`${numeric(minutes)}:`}</span>
            <span className={classes.count}>{numeric(seconds)}</span> */}
          </div>
        </div>
    </div>
  );
}

function numeric(number: number) {
  return number < 10 ? `0${number}` : number;
}
