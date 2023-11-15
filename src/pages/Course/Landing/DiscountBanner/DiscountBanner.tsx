import Sticker from 'assets/images/Svg/Sticker';
import { formatI18nT, i18n } from 'shared';
import Link from 'ui/Link/Link';
import classes from './DiscountBanner.module.scss';

import type { ICourseData } from 'types';

export default DiscountBanner;
const t = formatI18nT('discountBanner');

interface IProps {
  data: ICourseData
}

function DiscountBanner(props: IProps) {
  return (
    <div className={classes._}>
      <div className={classes.inner}>
        <a className={classes.content} href='#decision-form'>
          <div className={classes.discountWrapper}>
            <div className={classes.stickerWrapper}>
              <div className={classes.sticker}>
                <div className={classes.stickerPercentage}>
                  {props.data.discontAmount}
                  <span className='s-text-36'>{t('percentage')}</span>
                </div>
                <div className={classes.stickerText}>{t('discount')}</div>
                <div className={classes.svgWrapper}>
                <Sticker/>
                </div>
              </div>
            </div>
            <div className={classes.textWrapper + ' s-text-24'}>{t('text1')}<br/>{t('text2')}<br/>{formatCourseDiscountDeadline(props.data.discontDeadline)}</div>
          </div>
          <div className={classes.timerWrapper}>
            <div className={classes.timer}>
              <div className={classes.realtimeCountDown}>
                <div className={classes.realtimeCountDownSection}>
                  <span className='s-text-88'>03</span>
                  <small className='s-text-24'>{t('day')}</small>
                </div>
                <div className={classes.realtimeCountDownSection}>
                  <span className='s-text-88'>22</span>
                  <small className='s-text-24'>{t('hour')}</small>
                </div>
                <div className={classes.realtimeCountDownSection}>
                  <span className='s-text-88'>00</span>
                  <small className='s-text-24'>{t('minute')}</small>
                </div>
                <div className={classes.realtimeCountDownSection}>
                  <span className='s-text-88'>00</span>
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

function formatCourseDiscountDeadline(discontDeadline: Date) {
  const discontDeadlineStr =  discontDeadline.toLocaleDateString(
    ['ru-RU'],
    { month: 'long', day: 'numeric' }
  );
  return ` до ${discontDeadlineStr} 23:59`;
}
