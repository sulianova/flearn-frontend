import { memo } from 'react';

import Sticker from 'assets/images/Svg/Sticker';
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
          <h2 className={classes.title + ' s-text-20'}>Запишитесь заранее и сэкономьте</h2>
          <div className={classes.descriptionWrapper + ' s-text-20'}>
            {t('description1')}
            <span className={classes.count + ' s-text-20'}>
              {`${props.discontAmount}%`}
            </span>
            {t('description2')}
            <span className={classes.count + ' s-text-20'}>
              {t('description3', {
                day: i18n.t('day.p', { count: days }),
                days,
                hours: numeric(hours),
                minutes: numeric(minutes),
                seconds: numeric(seconds),
              })}
            </span>
            {/* {t('description', { discountAmount: props.discontAmount }) }
            <span className={classes.count + ' s-text-20'}>{` ${numeric(days)} день `}</span>
            <span className={classes.count + ' s-text-20'}>{`${numeric(hours)}:`}</span>
            <span className={classes.count + ' s-text-20'}>{`${numeric(minutes)}:`}</span>
            <span className={classes.count + ' s-text-20'}>{numeric(seconds)}</span> */}
          </div>
        </div>
    </div>
  );
}

function numeric(number: number) {
  return number < 10 ? `0${number}` : number;
}
