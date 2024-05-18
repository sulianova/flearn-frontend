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
      <div className={classes.header}>
        <div className={classes.headerTitle + ' s-text-56'}>{t('headerTitle')}</div>
      </div>
      <div className={classes.cards}>
        <div className={classes.introCard}>
          <Animated.Scroll>
            {(id, className) => (<div className={cx({ introCardQuote: true }, className) + ' s-text-28'} id={id}>{t('introCardQuote')}</div>)}
          </Animated.Scroll>
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
            <Animated.Scroll>
              {(id, className) => (<div className={cx({ videoCardTitle: true }, className) + ' s-text-24'} id={id}>
                {t('videoCardTitle')}
              </div>)}
            </Animated.Scroll>
            <Animated.Scroll>
              {(id, className) => (<div className={className + ' s-text-18'} id={id}>
                {t('videoCardText')}
              </div>)}
              </Animated.Scroll>
          </div>
        </div>
      </div>
    </div>
  );
}
