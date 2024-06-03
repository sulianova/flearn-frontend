import { useEffect, useMemo, useState } from 'react';
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

import Page, { EPageVariant } from 'ui/Page/Page';
import classesHeader from './LessonsHeader.module.scss';
import classesList from './LessonsList.module.scss';

import type { ICourseState, ILessonsState, IRootState, ILessonsData } from 'types';
import LessonsPopup from 'components/LessonsPopup/LessonsPopup';

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

interface IGroup {
  topic: string
  topicOrder: number
  lessons: ILessonsData[]
}

const t = formatI18nT('courseLessons');

function Lessons({ courseState, lessonsState }: IConnectedProps) {
  const { courseId } = useParams();
  const [guid, refetch] = useGuid();

  const authedUser = userService.useAuthedUser();
  const authedUserId = authedUser?.id;

  const [openedTopic, setOpenedTopic] = useState<string | null>(null);

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

    return lessons;
  }, [lessons, authedUser]);

  const groupes: IGroup[] = useMemo(() => {
    const getKey = (topic: string, topicOrder: number) => `${topic}-${topicOrder}`;
    return [...filteredLessons
      .reduce((acc, lessonData) => {
        const key = getKey(lessonData.lesson.topic, lessonData.lesson.topicOrder);
        if (!acc.has(key)) {
          acc.set(key, {
            topic: lessonData.lesson.topic,
            topicOrder: lessonData.lesson.topicOrder,
            lessons: [lessonData],
          })
        } else {
          const group = acc.get(key)!;
          group.lessons.push(lessonData);
          group.lessons.sort((a, b) => a.lesson.orderInTopic - b.lesson.orderInTopic);
        }

        return acc;
      }, new Map() as Map<string, IGroup>)
      .values()]
      .sort((a, b) => a.topicOrder - b.topicOrder);

  }, [filteredLessons]);

  const fallback = useFallback({ courseState, lessonsState });
  if (!courseState.data || !lessonsState.lessons || !lessonsState.lessons.length) {
    return fallback;
  }

  return (
    <>
      <Page variant={EPageVariant.LMS} header footer>
        <div className={classesHeader.title + ' s-text-28'}>{courseState.data.title}</div>
        {filteredLessons.length ? (
          <div className={classesList.wrapper}>
              {groupes.map((group, index) => {
                const totalDurationMinutes = group.lessons.reduce((acc, l) => acc + durationToMinutes(l.lesson.duration), 0);
                return (
                  <div className={classesList.itemWrapper} onClick={() => setOpenedTopic(group.topic)}>
                    <div key={index} className={classesList.item}>
                      <div className={classesList.imageWrapper}/>
                      <div className={classesList.itemBody}>
                        <div className={classesList.itemBodyContainer}>
                          <div className={classesList.titleContainer}>
                            <h2 className={classesList.title + ' s-text-21'}>
                              {group.topic}
                            </h2>
                          </div>
                        </div>
                        <div className={classesList.info}>
                          <div className={classesList.infoMain}>
                            <span className={classesList.infoItem + ' s-text-18'}>{`${group.lessons.length} урока`}</span>
                            <span className={classesList.infoItem + ' s-text-18'}>{`≈ ${Math.round(totalDurationMinutes / 6) / 10} ч  `}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        ) : (
          <div>{t(`courseNotStartedYet.${courseState.data.type}`, { minStartDate: formatDate(courseState.data.startDate, { timeZone: 'Europe/Moscow' }) })}</div>
        )}
      </Page>
      {openedTopic && courseId && (
        <LessonsPopup
          courseId={courseId}
          lessons={groupes.find(g => g.topic === openedTopic)!.lessons.map(l => l.lesson)}
          onClose={() => setOpenedTopic(null)}
        />
      )}
    </>
  );
}

function durationToMinutes(duration: { unit: 'minutes' | 'hours', value: number }) {
  return (duration.unit === 'hours' ? 60 : 1) * duration.value;
}
