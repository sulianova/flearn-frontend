import classNames from 'classnames/bind';
import { formatI18nT, i18n } from 'shared';
import { ICourseData } from 'services/course.service';
import Animated from 'ui/Animated';
import classes from './Explain.module.scss';
import Img from 'ui/Img/Img';
import Video from 'ui/Video/Video';

export default Explain;

interface IProps {
  data: ICourseData
}

const t = formatI18nT('courseLanding.explain');
const cx = classNames.bind(classes);

function Explain(props: IProps) {
  return (
    <div className={classes.wrapper}>
      <div className={classes.header}>
        <div className={classes.headerTitle + ' s-text-56'}>{t('headerTitle')}</div>
        <div className={classes.headerDesc + ' s-text-24'}>{t('headerDesc')}</div>
      </div>
      <div className={classes.cards}>
        <div className={classes.introCard}>
          <Animated.Scroll>
            {(id, className) => (<div className={cx({ introCardQuote: true }, className) + ' s-text-36'} id={id}>{t('introCardQuote')}</div>)}
          </Animated.Scroll>
        </div>
        <div className={classes.videoCard}>
          <div className={classes.videoCardContainer}>
            {props.data.explainMedia.type === 'image' ? (
              <Img
                src={props.data.explainMedia.imageSrc}
                alt={props.data.explainMedia.imageAlt}
              />
            ): (
              <Video.IFrame
                src={props.data.explainMedia.src}
                title={props.data.explainMedia.title}
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
