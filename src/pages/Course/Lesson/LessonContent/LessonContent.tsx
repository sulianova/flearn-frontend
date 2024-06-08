import { Fragment } from 'react';
import { useNavigate } from "react-router-dom";

import { dataService } from 'services/data.service';
import { homeworkService } from 'services/homework.service';
import type { ILessonContent, ILessonData } from 'services/lesson.service/types';
import { IUserData } from 'services/user.service';
import { formatI18nT } from 'shared';
import { URLSections } from 'types';
import type { IHomeworkDataWPopulate } from 'types';

import Edit from 'assets/images/Svg/Edit';
import Article from 'ui/Article/Article';
import Link from 'ui/Link/Link';

import TheoryFooter from '../TheoryFooter/TheoryFooter';
import classes from './LessonContent.module.scss';

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
  user: IUserData | null
  nextLessonId: string | undefined
}

function LessonContent(props: IProps) {
  const { courseId, user, nextLessonId } = props;
  const navigate = useNavigate();

  return (
    <div className={classes._}>
      {props.data.type === 'Practice' &&
        <Uppload
          courseId={props.courseId}
          lessonId={props.lessonId}
          homework={props.homework}
          scrollToUpload={props.scrollToUpload}
          canShowResults={props.canShowResults}
        />}
      <Article blocks={props.blocks}/>
      <TheoryFooter
        onNext={() => {
          if (!user || !nextLessonId) {
            return;
          }
          dataService.userCourseProgress
            .markLessonAsRead(props.courseId, user.email, props.data.id)
            .then(() => navigate(URLSections.Course.Lesson.to({ courseId, lessonId: nextLessonId })))
        }}
      />
    </div>
  );
}

interface IUpploadProps {
  courseId: string
  lessonId: string
  homework?: IHomeworkDataWPopulate
  scrollToUpload: () => void
  canShowResults: boolean
}

function Uppload(props: IUpploadProps) {
  const { courseId, lessonId, homework } = props;
  return (
    <Fragment>
      {/* <div className={classes.uploadDeadline}>
        <p className='s-text-24'>
          {t('uploadDeadline', { date: formatDate(endDate, { timeZone: 'Europe/Moscow', wWeekDay: true, wTime: true }) })}
        </p>
        <p className='s-text-24'>
          {t('resultsDeadline', { date: formatDate(resultsEndDate, { timeZone: 'Europe/Moscow', wWeekDay: true }) })}
        </p>
      </div> */}
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
            {(
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
