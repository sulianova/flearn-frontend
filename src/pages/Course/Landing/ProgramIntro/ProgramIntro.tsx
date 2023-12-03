import { formatI18nT, i18n } from 'shared';
import { formatDate } from 'utils';

import Image from 'ui/Img/Img';

import classes from './ProgramIntro.module.scss';

import type { ICourseData } from 'types';

export default ProgramIntro;

const t = formatI18nT('courseLanding.programIntro');

interface IProps {
  data: ICourseData
}

function ProgramIntro(props: IProps) {
  const { startDate, durationWeeks } = props.data;

  return (
    <div className={classes._} id='program-intro'>
      <div className={classes.inner}>
        <div className={classes.info}>
          <div className={classes.categories}>
            <div className={classes.categoriesItem + ' s-text-18'}>
              {t('datesInfoLabel', { 
                startDate: formatDate(startDate, { timeZone: 'Europe/Moscow' }),
                week: i18n.t('week', { count: durationWeeks }),
                durationWeeks,
              })}
            </div>
            <div className={classes.categoriesItem + ' s-text-18'}>{props.data.feild}</div>
          </div>
          <h1 className={classes.title + ' s-text-88'}>{props.data.title}</h1>
          <div className={classes.block + ' s-text-24'}>{props.data.introDescription}</div>
          {/* <div className={classes.actions}>
            <a className={classes.actionsBtn + ' s-text-24'} href='#decision-form'>{i18n.t('signUp')}</a>
          </div> */}
        </div>
        <div className={classes.cover}><Image src={props.data.introImageSrc} alt={props.data.introImageAlt}/></div>
      </div>
    </div>
  );
}
