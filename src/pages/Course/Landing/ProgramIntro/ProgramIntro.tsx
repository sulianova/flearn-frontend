import { DrawFree } from 'assets/images';
import { formatI18nT, i18n } from 'shared';
import Image from 'ui/Img/Img';
import Link from 'ui/Link/Link';
import classes from './ProgramIntro.module.scss';

import type { ICourseData } from 'types';

export default ProgramIntro;

interface IProps {
  data: ICourseData
}

function ProgramIntro(props: IProps) {

  return (
    <div className={classes._} id='program-intro'>
      <div className={classes.inner}>
        <div className={classes.categories}>
          <div className={classes.categoriesItem + ' s-text-18'}>{formatCourseDate(props.data.startDate, props.data.durationWeeks)}</div>
          <div className={classes.categoriesItem + ' s-text-18'}>{props.data.feild}</div>
        </div>
        <h1 className={classes.title + ' s-text-88'}>{props.data.title}</h1>
        <div className={classes.block + ' s-text-24'}>{props.data.introDescription}</div>
        <div className={classes.actions}>
          <a className={classes.actionsBtn + ' s-text-24'} href='#decision-form'>{i18n.t('signUp')}</a>
          {/* <div className={classes.actionsDiscount + ' s-text-36'} >{formatCourseDiscount(props.data.discontAmount, props.data.discontDeadline)}</div> */}
        </div>
        <div className={classes.cover}><Image src={props.data.introImageSrc} alt={props.data.introImageAlt}/></div>
      </div>
    </div>
  );
}

function formatCourseDate(startDate: Date, durationWeeks: number) {
  const dateStr = startDate.toLocaleDateString(
    ['ru-RU'],
    { month: 'long', day: 'numeric' }
  );
  return `${dateStr} | ${durationWeeks} недели`;
}

function formatCourseDiscount(discontAmount: number, discontDeadline: Date) {
  const discontAmountStr = `-${discontAmount}%`;
  const discontDeadlineStr =  discontDeadline.toLocaleDateString(
    ['ru-RU'],
    { month: 'long', day: 'numeric' }
  );
  return `${discontAmountStr} до ${discontDeadlineStr}`;
}
