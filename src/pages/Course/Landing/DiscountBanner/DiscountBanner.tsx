import { memo } from 'react';

import Sticker from 'assets/images/Svg/Sticker';
import { formatI18nT} from 'shared';

import useCountDown from './useCountDown';
import classes from './DiscountBanner.module.scss';

const t = formatI18nT('discountBanner');

export default memo(DiscountBanner);

interface IProps {
  discontAmount: number
  discontDeadline: Date
}

function DiscountBanner(props: IProps) {
  const { discontAmount, discontDeadline } = props;
  const { days, hours, minutes, seconds } = useCountDown({ deadline: discontDeadline });

  return (
    <div className={classes._}>
      <div className={classes.inner}>
        <a className={classes.content} /*href='#decision-form'*/>
          <div className={classes.discountWrapper}>
            <div className={classes.stickerWrapper}>
              <div className={classes.sticker}>
                <div className={classes.stickerPercentage}>
                  {discontAmount}
                  <span className='s-text-36'>%</span>
                </div>
                <div className={classes.stickerText}>{t('discount')}</div>
                <div className={classes.svgWrapper}>
                  <Sticker/>
                </div>
              </div>
            </div>
            <div className={classes.descriptionWrapper + ' s-text-24'}>
              {t('description', { deadline: formatDate(discontDeadline) })}
            </div>
          </div>
          <div className={classes.timerWrapper}>
            <div className={classes.timer}>
              <div className={classes.realtimeCountDown}>
                <div className={classes.realtimeCountDownSection}>
                  <span className='s-text-88'>{numeric(days)}</span>
                  <small className='s-text-24'>{t('day')}</small>
                </div>
                <div className={classes.realtimeCountDownSection}>
                  <span className='s-text-88'>{numeric(hours)}</span>
                  <small className='s-text-24'>{t('hour')}</small>
                </div>
                <div className={classes.realtimeCountDownSection}>
                  <span className='s-text-88'>{numeric(minutes)}</span>
                  <small className='s-text-24'>{t('minute')}</small>
                </div>
                <div className={classes.realtimeCountDownSection}>
                  <span className='s-text-88'>{numeric(seconds)}</span>
                  <small className='s-text-24'>{t('second')}</small>
                </div>
              </div>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}

function formatDate(date: Date) {
  // str = 25 декабря
  const str = date.toLocaleDateString(
    ['ru-RU'],
    {
      month: 'long',
      day: 'numeric',
    }
  );
  const dateStr = str;
  return dateStr;
}

function numeric(number: number) {
  return number < 10 ? `0${number}` : number;
}
