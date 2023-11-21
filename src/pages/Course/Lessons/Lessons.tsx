import { connect } from 'react-redux';
import { useParams } from 'react-router';

import { useFetch, useGuid } from 'hooks';
import { Fragment, useEffect, useMemo } from 'react';
import { formatI18nT, i18n } from 'shared';
import store from 'store';
import { updateState } from 'store/actions/redux';
import { IFetchCoursePayload, IFetchLessonsPayload, fetchCourse, fetchLessons } from 'store/actions/sagas';

import useFallback from './useFallback';

import Link from 'ui/Link/Link';
import Page from 'ui/Page/Page';
import classesHeader from './LessonsHeader.module.scss';
import classesList from './LessonsList.module.scss';

import { URLSections, type ICourseState, type ILessonsState, type IRootState, ILessonsData } from 'types';

export default connect(mapStateToProps)(Lessons);

interface IConnectedProps {
  courseState: ICourseState
  lessonsState: ILessonsState
  authedUserId?: string
}

function mapStateToProps(state: IRootState): IConnectedProps {
  return {
    courseState: state.course,
    lessonsState: state.lessons,
    authedUserId: state.user?.user?.id,
  };
}

const t = formatI18nT('courseLessons');

function Lessons({ courseState, lessonsState, authedUserId }: IConnectedProps) {
  const { courseId } = useParams();
  const [guid, refetch] = useGuid();

  useEffect(() => {
    refetch();
  }, [authedUserId]);

  useFetch<IFetchCoursePayload>(({
    actionCreator: fetchCourse,
    payload: {
      courseId: courseId ?? '',
    }
  }));

  useFetch<IFetchLessonsPayload & { guid: string }>(({
    actionCreator: fetchLessons,
    payload: {
      filter: { courseId: courseId ?? '' },
      guid,
    }
  }));

  useEffect(() => {
    // temp fix
    // TODO: fetch Lesson through service and not via Store
    store.dispatch(updateState({ stateName: 'lesson', payload: {
      courseId: undefined,
      lessonId: undefined,
      source: undefined,
      data: undefined,
      state: undefined,
    } }))
  }, []);

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
          const group = acc.get(lessonData.lesson.week)!;
          group.lessons.push(lessonData);
          group.lessons.sort((a, b) => a.lesson.orderInWeek - b.lesson.orderInWeek);
        }

        return acc;
      }, new Map() as Map<number, { lessons: ILessonsState['lessons'], week: number, startDate: Date, endDate: Date }>)
      .values()]
      .sort((a, b) => a.week - b.week);

  }, [lessons]);

  const fallback = useFallback({ courseState, lessonsState });
  if (!courseState.data || !lessonsState.lessons || !lessonsState.lessons.length) {
    return fallback;
  }

  return (
  <Page header footer wrapper='Lessons'>

    <div className={classesHeader._}>
    <div className={classesHeader.title + ' s-text-56'}>{courseState.data.title}</div>
      <div className={classesHeader.subTitle + ' s-text-24'}>{t('subTitle')}</div>
      <div className={classesHeader.links}>
        {/* <a className='key-link  s-text-18'>{t('linksAbout')}</a> */}
        <a className='key-link  s-text-18'>{t('linksTelegram')}</a>
      </div>
    </div>
    <div className={classesList.wrapper}>
      {renderGroups(groupes)}
    </div>
  </Page>);
}

interface IGroup {
  lessons: ILessonsData[]
  week: number
  startDate: Date
  endDate: Date
}

function renderGroups(groups: IGroup[]) {
  return groups.map(g => (<Fragment key={g.week}>{renderGroup(g)}</Fragment>));
}

function renderGroup(props: IGroup) {
  return (
    <div className={classesList.itemWrapper}>
      <div className={classesList.listDate + ' s-text-28'}>{formatWeekDate(props.startDate, props.endDate)}</div>
      {renderItems(props.lessons)}
    </div>
  );
}

function renderItems(props: ILessonsData[]) {
  return props.map(l => (<Fragment key={l.lesson.id}>{renderItem(l)}</Fragment>));
}

function renderItem(lesson: ILessonsData) {
  if (lesson.lesson.type === 'Theory') {
    return (
      <div className={classesList.item}>
        <Link
          to={URLSections.Course.Lesson.to({ courseId: lesson.lesson.courseId, lessonId: lesson.lesson.id })}
          className={classesList.itemTitle + ' nav-link s-text-21'}
        >
          {lesson.lesson.title}
        </Link>
      </div>
    );
  }

  const homeworkLink = (
    <div className={classesList.itemLink}>
      <Link
        className='nav-link s-text-18'
        to={URLSections.Course.Lesson.to({ courseId: lesson.lesson.courseId, lessonId: lesson.lesson.id })}
      >
        {t('homework')}
      </Link>
    </div>
  );

  return (
    <div className={classesList.item}>
      <div className={classesList.task + ' s-text-21'}>{lesson.lesson.title}</div>
      <div className={classesList.itemLinks}>
        {homeworkLink}
        {/* {props.lesson.webinarLink && <div className={classesList.itemLink}><a className='link s-text-18' href={props.lesson.webinarLink}>{t('webinar')}</a></div>} */}
        {/* {props.lesson.resultsLink && <div className={classesList.itemLink}><a className='link s-text-18' href={props.lesson.resultsLink}>{t('results')}</a></div>} */}
      </div>
    </div>
  );
}

function getLinks(props: ILessonsData) {
  const { courseId, id } = props.lesson;

  const lectureLink = props.lesson.type === 'Theory' ? URLSections.Course.Lesson.to({ courseId, lessonId: id }) : null;
  const homeworkLink = props.lesson.type === 'Practice' ? URLSections.Course.Lesson.to({ courseId, lessonId: id }) : null;

  return { lectureLink, homeworkLink };
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
