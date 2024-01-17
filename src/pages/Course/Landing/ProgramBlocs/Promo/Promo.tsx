import classNames from 'classnames/bind';
import { formatI18nT } from 'shared';
import { ICourseData } from 'services/course.service';
import Animated from 'ui/Animated';
import Video from 'ui/Video/Video';
import classes from './Promo.module.scss';

export default Promo;
interface IProps {
  data: ICourseData
}

const cx = classNames.bind(classes);
const t = formatI18nT('courseLanding.promo');

function Promo(props: IProps) {
  if (!props.data.promoVideo) {
    return null;
  }

  return (
    <div className={classes.wrapper}>
      <div className={classes.cards}>
        <div className={classes.card}>
          <Animated.Scroll>
            {(id, className) => (<h2 className={cx({ cardTitle: true }, className)  + ' s-text-56'} id={id}>{t('cardTitle')}</h2>)}
          </Animated.Scroll>
        </div>
        <div className={cx({ card: true, videoCard: true })}>
          <div className={classes.videoCardContainer}>
            <Video.IFrame src={props.data.promoVideo.src} title={props.data.promoVideo.title}/>
          </div>
        </div>
      </div>
    </div>
  );
}
