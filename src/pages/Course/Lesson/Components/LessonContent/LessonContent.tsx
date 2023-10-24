import { Fragment } from 'react';
import { IHomeworkData, IHomeworkDataWPopulate, ILessonContent, ILessonData } from 'types';
import classes from './LessonContent.module.scss';

import Article from 'ui/Article/Article';
import Edit from 'assets/images/Svg/Edit';

import { formatI18nT } from 'shared';

export default LessonContent;

const t = formatI18nT('courseLesson');

interface IProps {
  blocks: ILessonContent
  data: ILessonData
  homework?: IHomeworkDataWPopulate
}

function LessonContent(props: IProps) {
  return (
    <div className={classes._}>
      {props.data.type === 'Practice' && <Uppload endDate={props.data.endDate} resultsEndDate={props.data.resultsEndDate}/>}
      <Article blocks={props.blocks}/>
    </div>
  );
}

interface IUpploadProps {
  endDate: Date
  resultsEndDate: Date
}

function Uppload({ endDate, resultsEndDate }: IUpploadProps) {
  return (
    <Fragment>
      <div className={classes.uploadDeadline}>
        <p className='s-text-24'>
          {t('deadlineUploadText')} {getWeekDay(endDate)} {formatLessonDate(endDate)} {t('deadlineUploadTime')}
        </p>
        <p className='s-text-24'>
          {t('deadlineResultsText')} {getWeekDay(resultsEndDate)} {formatLessonResultsDate(resultsEndDate)}
        </p>
      </div>
      <div className={classes.resultLinkWrapper}>
        <h3 className={classes.resultLinkTitle + ' s-text-28'}>{t('resultLinkTitle')}</h3>
        <div className={classes.resultLinkGroup}>
          <a className={classes.resultLink + ' s-text-18 key-link'} href='#upload-form'>Sofiia Ulianova</a>
          <button className={classes.edit}>
            <div className={classes.editImg}>
              <Edit/>
            </div>
            {/* <div className={classes.editTitle + ' s-text-16'}>{t('editTitle')}</div> */}
          </button>
        </div>
      </div>
      {/* <div className={classes.uploadBtnWrapper}>
        <a className={classes.uploadBtn + ' s-text-24'} href='#upload-form'>{t('uploadBtn')}</a>
      </div> */}
    </Fragment>
  );
}

function getWeekDay(date: Date) {
  const weekday = ['воскресенье','понедельник','вторник','среда','четверг','пятница','суббота'];
  return weekday[date.getDay()];
}

function formatLessonDate(date: Date) {
  const dateStr = date.toLocaleDateString(
    ['ru-RU'],
    { month: 'long', day: 'numeric' }
  );
  return `${dateStr} 2023, `;
}

function formatLessonResultsDate(date: Date) {
  const dateStr = date.toLocaleDateString(
    ['ru-RU'],
    { month: 'long', day: 'numeric' }
  );
  return `${dateStr}`;
}