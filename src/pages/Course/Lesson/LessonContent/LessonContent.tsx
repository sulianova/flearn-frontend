import { Fragment } from 'react';

import { formatI18nT } from 'shared';

import Edit from 'assets/images/Svg/Edit';
import Article from 'ui/Article/Article';
import Link from 'ui/Link/Link';

import classes from './LessonContent.module.scss';

import { URLSections } from 'types';
import type { IHomeworkDataWPopulate, ILessonContent, ILessonData } from 'types';
import { homeworkService } from 'services';
import { formatDate } from 'utils';

export default LessonContent;

const t = formatI18nT('courseLesson');

interface IProps {
  courseId: string
  lessonId: string
  blocks: ILessonContent
  data: ILessonData
  homework?: IHomeworkDataWPopulate
  scrollToUpload: () => void
  canShowResults: boolean
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
          canShowResults={props.canShowResults}
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
  homework?: IHomeworkDataWPopulate
  scrollToUpload: () => void
  canShowResults: boolean
}

function Uppload(props: IUpploadProps) {
  const { courseId, lessonId, endDate, resultsEndDate, homework } = props;
  return (
    <Fragment>
      <div className={classes.uploadDeadline}>
        <p className='s-text-24'>
          {t('uploadDeadline', { date: formatDate(endDate, { timeZone: 'Europe/Moscow', wWeekDay: true, wTime: true }) })}
        </p>
        <p className='s-text-24'>
          {t('resultsDeadline', { date: formatDate(resultsEndDate, { timeZone: 'Europe/Moscow', wWeekDay: true }) })}
        </p>
      </div>
      {homework && homework.homework.state !== 'DRAFT' && (!props.canShowResults || homework.populate?.user?.role === 'support') && (
        <div className={classes.myWorkLinkWrapper}>
          <h3 className={classes.myWorkLinkTitle + ' s-text-28'}>{t('myWorkLinkTitle')}</h3>
          <div className={classes.myWorkLinkGroup}>
            <Link
              className={classes.myWorkLink + ' s-text-18 key-link'}
              to={URLSections.Course.Lesson.MyWork.to({ courseId, lessonId })}
            >
              {homework.populate?.user?.displayName}
            </Link>
            {endDate > new Date() && (
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
            )}
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
