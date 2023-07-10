import classNames from 'classnames/bind';
import classes from './Promo.module.scss';

export default Promo;

const cx = classNames.bind(classes);

function Promo() {
  return (
    <div className={classes.wrapper}>
      <div className={classes.cards}>
        <div className={classes.card}>
        <h2 className={classes.cardTitle + ' s-text-56'}>Больше о курсе в&nbsp;коротком видео</h2>
        </div>
        <div className={cx({ card: true, videoCard: true })}>
          <div className={classes.videoCardContainer}>
            <iframe src='https://www.youtube.com/embed/ag6PuGjJdbU?autoplay=1&amp;mute=1&amp;loop=1' title='YouTube video player' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'/>
          </div>
        </div>
      </div>
    </div>
  );
}
