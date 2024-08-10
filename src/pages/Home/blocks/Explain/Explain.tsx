import { TCourseExplainMedia } from 'services/course.service';
import { formatI18nT } from 'shared';

import Img from 'ui/Img/Img';

import classes from './Explain.module.scss';

export default Explain;

interface IProps {
  explainMedia: TCourseExplainMedia
}

const t = formatI18nT('courseLanding.explain');

function Explain() {
  return (
    <div data-bcalternate className={classes.wrapper}>
      <div className={classes.cards}>
        <div className={classes.introCard}>
            <div className={classes.introCardQuote}>{t('introCardQuote0')}</div>
            <div className={classes.introCardQuote}>{t('introCardQuote')}</div>
            <div className={classes.introCardQuote}>{t('videoCardText')}</div>
        </div>
        <div className={classes.videoCard}>
          <div className={classes.videoCardContainer}>
            <div className={classes.buble}>
              <div>иллюстратор, преподаватель</div>
            </div>
              <Img
                src='https://firebasestorage.googleapis.com/v0/b/flearn-6b617.appspot.com/o/how-to-draw%2Flanding%2Fimages%2FSofiUlianova.jpg?alt=media&token=3ef7a44f-9ade-41ad-8ec2-a4d36555b3c7'
                alt='author'
              />
          </div>
          <div className={classes.videoCardDesc}>{t('videoCardText')}</div>
        </div>
      </div>
    </div>
  );
}
