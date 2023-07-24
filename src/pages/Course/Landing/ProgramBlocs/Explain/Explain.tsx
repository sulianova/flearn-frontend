import { formatI18nT, i18n } from 'shared';
import { ICourseData } from 'types';
import Iframe from 'ui/Video/Iframe';
import classes from './Explain.module.scss';

export default Explain;

interface IProps {
  data: ICourseData
}

const t = formatI18nT('courseLanding.explain');

function Explain(props: IProps) {
  return (
    <div className={classes.wrapper}>
      <div className={classes.header}>
        <div className={classes.headerTitle + ' s-text-56'}>{t('headerTitle')}</div>
        <div className={classes.headerDesc + ' s-text-24'}>{t('headerDesc')}</div>
      </div>
      <div className={classes.cards}>
        <div className={classes.videoCard}>
          <div className={classes.videoCardContainer}>
            <Iframe src={props.data.explainVideo.src} title={props.data.explainVideo.title}/>
          </div>
          <div className={classes.videoCardDesc}>
            <div className={classes.videoCardTitle + ' s-text-24'}>
              {t('videoCardTitle')}
            </div>
            <div className='s-text-18'>
              {t('videoCardText')}
            </div>
          </div>
        </div>
        <div className={classes.introCard}>
          <div className={classes.introCardQuote + ' s-text-36'}>{t('introCardQuote')}</div>
        </div>
      </div>
    </div>
  );
}
