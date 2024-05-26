import { formatI18nT, i18n } from 'shared';
import { formatDate } from 'utils';

import Image from 'ui/Img/Img';

import classes from './ProgramIntro.module.scss';

import type { ICourseData } from 'services/course.service';
import { EAnalyticsEvent, analyticsService } from 'services/analytics.service';

export default ProgramIntro;

const t = formatI18nT('courseLanding.programIntro');

interface IProps {
  data: ICourseData
}

function ProgramIntro(props: IProps) {
  const { startDate, duration, creditPrice, discontDeadline } = props.data;

  const labels = [
    t('datesInfoLabel', { 
      startDate: formatDate(startDate, { timeZone: 'Europe/Moscow' }),
      durationInUnits: duration.value,
      unit: duration.unit,
    }),
    !creditPrice && !discontDeadline && t('free'),
  ].filter(Boolean);

  return (
    <div className={classes._} id='program-intro'>
      <div className={classes.inner}>
        <div className={classes.info}>
          <div className={classes.categories}>
            {labels.map((label, i) => (
              <div className={classes.categoriesItem + ' s-text-16'} key={i}>{label}</div>
            ))}
          </div>
          <h1 className={classes.title + ' s-text-56'}>{props.data.title}</h1>
          <div className={classes.block + ' s-text-21'}>{props.data.introDescription}</div>
          <div className={classes.actions}>
            <a
              className={classes.actionsBtn + ' s-text-21'}
              href='#decision-form'
              onClick={() => analyticsService.logEvent({
                  type: EAnalyticsEvent.ButtonClicked,
                  data: {
                    type: 'scroll_to_decision_form_button_clicked',
                  },
                })
              }
            >
              <div className={classes.text}>{i18n.t('signUp')}</div>
              <div className={classes.background}></div>
            </a>
          </div>
        </div>
        <div className={classes.cover}><Image src={props.data.introImage.imageSrc} alt={props.data.introImage.imageAlt}/></div>
      </div>
    </div>
  );
}
