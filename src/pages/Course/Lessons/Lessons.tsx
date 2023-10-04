import { connect } from 'react-redux';

import { useFetch } from 'hooks';
import { Fragment, useMemo } from 'react';
import { formatI18nT, i18n } from 'shared';
import { IFetchLessonsPayload, fetchCourse, fetchLessons } from 'store/actions/sagas';

import Page from 'ui/Page/Page';
import classesHeader from './LessonsHeader.module.scss';
import classesList from './LessonsList.module.scss';

import type { ILessonsState, IRootState } from 'types';
export default connect(mapStateToProps)(Lessons);

interface IConnectedProps {
  lessonsState?: ILessonsState
}

function mapStateToProps(state: IRootState): IConnectedProps {
  return {
    lessonsState: state.lessons
  };
}

const t = formatI18nT('courseLessons');

function Lessons({ lessonsState }: IConnectedProps) {
  useFetch<IFetchLessonsPayload>(({
    actionCreator: fetchLessons,
    payload: {
      filter: { courseId: 'hot-to-draw' },
      populate: { course: true },
    }
  }));

  const lessons = lessonsState?.lessons;

  const groupes: IGroup[] = useMemo(() => {
    if (!lessons) {
      return [];
    }

    return [...lessons
      .reduce((acc, lessonData) => {
        if (!acc.has(lessonData.lesson.week)) {
          acc.set(lessonData.lesson.week, {
            week: lessonData.lesson.week,
            startDate: lessonData.lesson.startDate,
            endDate: lessonData.lesson.endDate,
            lessons: [lessonData],
          })
        } else {
          acc.get(lessonData.lesson.week)!.lessons.push(lessonData);
        }

        return acc;
      }, new Map() as Map<number, IGroup>)
      .values()]
      // TODO sort lessons infos by ???
      .sort((a, b) => a.week - b.week);

  }, [lessons]);

  if (!lessons) {
    return (
      <Page header footer wrapper='Lessons'>
        <p>loading lessons</p>
      </Page>
    );
  }

  const courseData = lessonsState.lessons[0]?.populate?.course;

  if (!courseData) {
    return (
      <Page header footer wrapper='Lessons'>
        <p>Error</p>
      </Page>
    );
  }

  return (
  <Page header footer wrapper='Lessons'>

    <div className={classesHeader._}>
    <div className={classesHeader.title + ' s-text-56'}>{courseData.title}</div>
      <div className={classesHeader.subTitle + ' s-text-24'}>{t('subTitle')}</div>
      <div className={classesHeader.links}>
        <a className='key-link  s-text-18'>{t('linksAbout')}</a>
        <a className='key-link  s-text-18'>{t('linksTelegram')}</a>
      </div>
    </div>
    <div className={classesList.wrapper}>
      <div className={classesList.list}>
        {renderGroups(groupes)}
      </div>
    </div>
  </Page>);
}

interface IGroup {
  lessons: ILessonsState['lessons']
  week: number
  startDate: Date
  endDate: Date
}

function renderGroups(props: IGroup[]) {
  return props.map((d, index) => (<Fragment key={index}>{renderGroup(d)}</Fragment>));
}

function renderGroup(props: IGroup) {
  return (
    <div className={classesList.itemWrapper}>
      <div className={classesList.itemDate + ' s-text-28'}>{formatWeekDate(props.startDate, props.endDate)}</div>
      {renderItems(props.lessons)}
    </div>
  );
}

function renderItems(props: ILessonsState['lessons'] ) {
  return props.map((d, index) => (<Fragment key={index}>{renderItem(d)}</Fragment>));
}

function renderItem(props: ILessonsState['lessons'][number]) {
  return (
    <div className={classesList.item}>
      <div className={classesList.itemTitle + ' s-text-21'}>{props.lesson.title}</div>
      <div className={classesList.itemLinks}>
        {props.lesson.lectureLink && <div className={classesList.itemLink}><a className='link s-text-18' href={props.lesson.lectureLink}>{t('lecture')}</a></div>}
        {props.lesson.homeworkLink && <div className={classesList.itemLink}><a className='link s-text-18' href={props.lesson.homeworkLink}>{t('homework')}</a></div>}
        {props.lesson.webinarLink && <div className={classesList.itemLink}><a className='link s-text-18' href={props.lesson.webinarLink}>{t('webinar')}</a></div>}
        {props.lesson.resultsLink && <div className={classesList.itemLink}><a className='link s-text-18' href={props.lesson.resultsLink}>{t('results')}</a></div>}
      </div>
    </div>
  );
}

function formatWeekDate(startDate: Date, endDate: Date) {
  const startDateStr = startDate.toLocaleDateString(
    ['ru-RU'],
    { month: 'long', day: 'numeric' }
  );
  const endDateStr = endDate.toLocaleDateString(
    ['ru-RU'],
    { month: 'long', day: 'numeric' }
  );

  return `${startDateStr} – ${endDateStr}`;
}
