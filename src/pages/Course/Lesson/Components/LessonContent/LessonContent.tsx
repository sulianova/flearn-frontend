import { Fragment } from 'react';
import { IHomeworkData, ILessonContent, ILessonData } from 'types';
import classes from './LessonContent.module.scss';

import Article from 'ui/Article/Article';

import { formatI18nT } from 'shared';

import Cross from 'assets/images/Svg/Cross';

export default LessonContent;

const t = formatI18nT('courseLesson');

interface IProps {
  blocks: ILessonContent
  data: ILessonData
  homework?: IHomeworkData
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
      <div className={classes.uploadDeadline + ' s-text-24'}>
        {t('deadlineUploadText')} {getWeekDay(endDate)} {formatLessonDate(endDate)} {t('deadlineUploadTime')}
        <br/>
        {t('deadlineResultsText')} {getWeekDay(resultsEndDate)} {formatLessonResultsDate(resultsEndDate)}
      </div>
      <div className={classes.uploadBtnWrapper}>
        <a className={classes.uploadBtn + ' s-text-24'} href='#upload-form'>Загрузить работу</a>
      </div>
      {/* <div className={classes.resultLinkWrapper}>
        <h3 className={classes.resultLinkTitle + ' s-text-24'}>Результаты задания</h3>
        <div className={classes.resultLinkGroup}>
          <a className={classes.resultLink + ' s-text-18 key-link'} href='#upload-form'>Sofiia Ulianova</a>
          <button className={classes.remove}>
            <div className={classes.removeImg}>
              <Cross/>
            </div>
            <div className={classes.removeTitle + ' s-text-14'}>Удалить</div>
          </button>
        </div>
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