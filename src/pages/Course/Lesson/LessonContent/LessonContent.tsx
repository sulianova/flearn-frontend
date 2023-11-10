import { Fragment } from 'react';

import { formatI18nT } from 'shared';

import Edit from 'assets/images/Svg/Edit';
import Article from 'ui/Article/Article';
import Link from 'ui/Link/Link';

import classes from './LessonContent.module.scss';

import { URLSections } from 'types';
import type { IHomeworkDataWPopulate, ILessonContent, ILessonData } from 'types';
import { homeworkService } from 'services';

export default LessonContent;

const t = formatI18nT('courseLesson');

interface IProps {
  courseId: string
  lessonId: string
  blocks: ILessonContent
  data: ILessonData
  homework: IHomeworkDataWPopulate
  scrollToUpload: () => void
}

function LessonContent(props: IProps) {
  return (
    <div className={classes._}>
      {props.data.type === 'Practice' &&
        <Uppload
          courseId={props.courseId}
          lessonId={props.lessonId}
          endDate={props.data.endDate}
          resultsEndDate={props.data.resultsEndDate}
          homework={props.homework}
          scrollToUpload={props.scrollToUpload}
        />}
      <Article blocks={props.blocks}/>
    </div>
  );
}

interface IUpploadProps {
  courseId: string
  lessonId: string
  endDate: Date
  resultsEndDate: Date
  homework: IHomeworkDataWPopulate
  scrollToUpload: () => void
}

function Uppload(props: IUpploadProps) {
  const { courseId, lessonId, endDate, resultsEndDate, homework } = props;
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
      {homework && homework.homework.state === 'SENT_FOR_REVIEW' && (
        <div className={classes.resultLinkWrapper}>
          <h3 className={classes.resultLinkTitle + ' s-text-28'}>{t('resultLinkTitle')}</h3>
          <div className={classes.resultLinkGroup}>
            <Link
              className={classes.resultLink + ' s-text-18 key-link'}
              to={URLSections.Course.Lesson.Results.to({ courseId, lessonId, params: { userId: homework.populate?.user?.id } })}
            >
              {homework.populate?.user?.displayName}
            </Link>
            <button
              className={classes.edit}
              onClick={() =>
                homeworkService.patchHomework(homework.homework.id, { state: 'DRAFT' })
                  .then(() => props.scrollToUpload())
              }
            >
              <div className={classes.editImg}>
                <Edit/>
              </div>
            </button>
          </div>
        </div>
      )}
      {/* {(homework.homework.state === 'DRAFT') && (
        <div className={classes.uploadBtnWrapper}>
          <a className={classes.uploadBtn + ' s-text-24'} href='#upload-form'>{t('uploadBtn')}</a>
        </div>
      )} */}
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