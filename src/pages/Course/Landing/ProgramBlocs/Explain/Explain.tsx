import { formatI18nT, i18n } from 'shared';
import classes from './Explain.module.scss';

export default Explain;

const t = formatI18nT('courseLanding.explain');

function Explain() {
  return (
    <div className={classes.wrapper}>
      <div className={classes.header}>
        <div className={classes.headerTitle + ' s-text-56'}>{t('headerTitle')}</div>
        <div className={classes.headerDesc + ' s-text-24'}>{t('headerDesc')}</div>
      </div>
      <div className={classes.cards}>
        <div className={classes.videoCard}>
          <div className={classes.videoCardContainer}>
            <iframe src='https://www.youtube.com/embed/ag6PuGjJdbU?autoplay=1&amp;mute=1&amp;loop=1' title='YouTube video player'/>
          </div>
          <div className={classes.videoCardDesc + ' s-text-18'}>{t('videoCardDesc')}</div>
        </div>
        <div className={classes.introCard}>
          <div className={classes.introCardQuote + ' s-text-36'}>{t('introCardQuote')}</div>
        </div>
      </div>
    </div>
  );
}
