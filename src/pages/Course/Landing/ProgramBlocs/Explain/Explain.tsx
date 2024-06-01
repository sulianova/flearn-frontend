import classNames from 'classnames/bind';

import { ICourseData } from 'services/course.service';
import { formatI18nT } from 'shared';

import Animated from 'ui/Animated';
import Img from 'ui/Img/Img';
import Video from 'ui/Video/Video';

import classes from './Explain.module.scss';

export default Explain;

interface IProps {
  explainMedia: NonNullable<ICourseData['explainMedia']>
}

const t = formatI18nT('courseLanding.explain');
const cx = classNames.bind(classes);

function Explain({ explainMedia }: IProps) {
  if (!explainMedia) {
    return null;
  }

  return (
    <div className={classes.wrapper}>
      {/* <div className={classes.header}>
        <div className={classes.headerTitle + ' s-text-56'}>{t('headerTitle')}</div>
      </div> */}
      <div className={classes.cards}>
        <div className={classes.introCard}>
            <div className={classes.introCardQuote + ' s-text-70'}>{t('introCardQuote0')}</div>
            <div className={classes.introCardQuote + ' s-text-70 color-content-inverted-secondary'}>{t('introCardQuote')}</div>
        </div>
        <div className={classes.videoCard}>
          <div className={classes.videoCardContainer}>
            {explainMedia.type === 'image' ? (
              <Img
                src={explainMedia.imageSrc}
                alt={explainMedia.imageAlt}
              />
            ): (
              <Video.IFrame
                src={explainMedia.src}
                title={explainMedia.title}
              />
            )}
          </div>
          <div className={classes.videoCardDesc}>
            {/* <Animated.Scroll>
              {(id, className) => (<div className={cx({ videoCardTitle: true }, className) + ' s-text-21'} id={id}>
                {t('videoCardTitle')}
              </div>)}
            </Animated.Scroll> */}
            <Animated.Scroll>
              {(id, className) => (<div className={classes.videoCardText + ' s-text-16'} id={id}>
                {t('videoCardText')}
              </div>)}
              </Animated.Scroll>
          </div>
        </div>
      </div>
    </div>
  );
}
