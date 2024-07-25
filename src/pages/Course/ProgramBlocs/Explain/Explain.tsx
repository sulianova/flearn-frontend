import { TCourseExplainMedia } from 'services/course.service';
import { formatI18nT } from 'shared';

import Img from 'ui/Img/Img';
import Video from 'ui/Video/Video';

import classes from './Explain.module.scss';

export default Explain;

interface IProps {
  explainMedia: TCourseExplainMedia
}

const t = formatI18nT('courseLanding.explain');

function Explain({ explainMedia }: IProps) {
  if (!explainMedia) {
    return null;
  }

  return (
    <div className={classes.wrapper}>
      <div className={classes.cards}>
        <div className={classes.introCard}>
            <div className={classes.introCardQuote + ' font-light'}>{t('introCardQuote0')}</div>
            <div className={classes.introCardQuote}>{t('introCardQuote')}</div>
        </div>
        <div className={classes.videoCard}>
          <div className={classes.videoCardContainer}>
            <div className={classes.buble}>
              <div>иллюстратор, преподаватель</div>
            </div>
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
            <div className={classes.videoCardText}>{t('videoCardText')}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
