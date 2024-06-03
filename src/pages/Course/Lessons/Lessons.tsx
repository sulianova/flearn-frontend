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
import Page, { EPageVariant } from 'ui/Page/Page';
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
  <Page variant={EPageVariant.LMS} header footer>
    <div className={classesHeader.title + ' s-text-28'}>{courseState.data.title}</div>
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
    <>
      {renderItems(props.lessons)}
    </>
  );
}

function renderItems(props: ILessonsData[]) {
  return props.map(l => (<div className={classesList.itemWrapper} key={l.lesson.id}>{renderItem(l)}</div>));
}

function renderItem(lesson: ILessonsData) {
    return (
      <Link 
        className={classesList.item}
        to={URLSections.Course.Lesson.to({ courseId: lesson.lesson.courseId, lessonId: lesson.lesson.id })}
      >
        <div className={classesList.imageWrapper}></div>
        <div className={classesList.itemBody}>
          <div className={classesList.itemBodyContainer}>
            <div className={classesList.titleContainer}>
              <h2 className={classesList.title + ' s-text-21'}>
                {lesson.lesson.title}
              </h2>
            </div>
          </div>
          <div className={classesList.info}>
            <div className={classesList.infoMain}>
              <span className={classesList.infoItem + ' s-text-18'}>4 урока</span>
              <span className={classesList.infoItem + ' s-text-18'}>≈ 2 ч  </span>
            </div>
          </div>
        </div>
      </Link>
    );
}

function formatWeekDate(startDate: Date, endDate: Date) {
  const startDateStr = formatDate(startDate, { timeZone: 'Europe/Moscow' });
  const endDateStr = formatDate(endDate, { timeZone: 'Europe/Moscow' });

  return `${startDateStr} – ${endDateStr}`;
}
