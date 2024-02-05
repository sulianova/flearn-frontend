import { Fragment, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router';

import { useFetch, useGuid } from 'hooks';
import { formatI18nT } from 'shared';
import { formatDate } from 'utils';

import { userService } from 'services/user.service';
import store from 'store';
import { updateState } from 'store/actions/redux';
import { IFetchCoursePayload, IFetchLessonsPayload, fetchCourse, fetchLessons } from 'store/actions/sagas';

import useFallback from './useFallback';

import Link from 'ui/Link/Link';
import Page from 'ui/Page/Page';
import classesHeader from './LessonsHeader.module.scss';
import classesList from './LessonsList.module.scss';

import { URLSections } from 'types';
import type { ICourseState, ILessonsState, IRootState, ILessonsData } from 'types';

export default connect(mapStateToProps)(Lessons);

interface IConnectedProps {
  courseState: ICourseState
  lessonsState: ILessonsState
}

function mapStateToProps(state: IRootState): IConnectedProps {
  return {
    courseState: state.course,
    lessonsState: state.lessons,
  };
}

const t = formatI18nT('courseLessons');

function Lessons({ courseState, lessonsState }: IConnectedProps) {
  const { courseId } = useParams();
  const [guid, refetch] = useGuid();

  const authedUser = userService.useAuthedUser();
  const authedUserId = authedUser?.id;
  const minStartDate = (lessonsState.lessons ?? [])
    .reduce(
      ( minDate, l) => minDate < l.lesson.startDate ? minDate : l.lesson.startDate
      , lessonsState.lessons?.[0]?.lesson?.startDate
    );

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

  useEffect(() => {
    // temp fix
    // TODO: fetch Lessons through service and not via Store
    return () => {
      store.dispatch(updateState({ stateName: 'lessons', payload: {
        lessons: [],
        state: undefined,
      } }));
    }
  }, []);

  const lessons = lessonsState?.lessons;
  const filteredLessons = useMemo(() => {
    if (!lessons) {
      return [];
    }

    if (authedUser?.role === 'support') {
      return lessons;
    }

    return lessons.filter(l => l.lesson.startDate < new Date());
  }, [lessons, authedUser]);

  const groupes: IGroup[] = useMemo(() => {
    return [...filteredLessons
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

  }, [filteredLessons]);

  const fallback = useFallback({ courseState, lessonsState });
  if (!courseState.data || !lessonsState.lessons || !lessonsState.lessons.length) {
    return fallback;
  }

  return (
  <Page header footer wrapper='Lessons'>

    <div className={classesHeader._}>
    <div className={classesHeader.title + ' s-text-56'}>{courseState.data.title}</div>
      <div className={classesHeader.subTitle + ' s-text-24'}>{t(['subTitle', courseState.data.type])}</div>
      <div className={classesHeader.links}>
        {/* <a className='key-link  s-text-18'>{t('linksAbout')}</a> */}
        <Link
          className='key-link  s-text-18'
          to={courseState.data.telegramLink}
          target='_blank'
        >{t('linksTelegram')}</Link>
      </div>
    </div>
    {filteredLessons.length ? (
      <div className={classesList.wrapper}>
        {renderGroups(groupes)}
      </div>
    ) : (
      <div>{t(`courseNotStartedYet.${courseState.data.type}`, { minStartDate: formatDate(minStartDate, { timeZone: 'Europe/Moscow' }) })}</div>
    )}
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

function formatWeekDate(startDate: Date, endDate: Date) {
  const startDateStr = formatDate(startDate, { timeZone: 'Europe/Moscow' });
  const endDateStr = formatDate(endDate, { timeZone: 'Europe/Moscow' });

  return `${startDateStr} – ${endDateStr}`;
}
