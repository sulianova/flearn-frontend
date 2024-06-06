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

import { type ICourseState, type ILessonsState, type IRootState, type ILessonsData, ECommonErrorTypes } from 'types';
import LessonsPopup from 'components/LessonsPopup/LessonsPopup';
import { ILessonData, TLessonState, lessonService } from 'services/lesson.service';
import { ICourseData, TCourseState, courseService } from 'services/course.service';
import { TCourseError } from 'services/course.service/types';
import { TAccess, TAccessData } from 'services/data.service/Access';
import { TUserCourseProgress } from 'services/data.service/UserCourseProgress';
import { dataService } from 'services';


interface IGroup {
  topic: string
  topicOrder: number
  isFree: boolean
  lessons: (ILessonData & { canBeAccessed: boolean })[]
}

const t = formatI18nT('courseLessons');

export default function Lessons() {
  const { courseId } = useParams();

  const authedUser = userService.useAuthedUser();
  const [courseState, setCourseState] = useState<{ state: TCourseState, course?: ICourseData }>({ state: { type: 'pending' }, course: undefined });
  const [lessonsState, setLessonsState] = useState<{ state: TLessonState, lessons: ILessonData[] }>({ state: { type: 'pending' }, lessons: [] });
  const [access, setAccess] = useState<TAccess | null>(null);
  const [userCourseProgress, setUserCourseProgress] = useState<TUserCourseProgress | null>(null);

  const [openedTopic, setOpenedTopic] = useState<string | null>(null);

  useEffect(() => {
    if (!courseId) {
      return;
    }

    let cancelled = false;
    const s = courseService
      .getCourseBS({ filter: { id: courseId }})
      .subscribe(o => {
        if (!o || cancelled) {
          return;
        }
        if (o instanceof Error) {
          const error = o;
          const errorIsUnknown = !(Object.values(ECommonErrorTypes) as string[]).includes(error.message);
          const errorType = errorIsUnknown ? ECommonErrorTypes.Other : error.message as TCourseError;
          setCourseState({ state: { type: 'error', error, errorType }, course: undefined });
          return;
        }
        setCourseState({ state: { type: 'idle' }, course: o.courses[0]})
      });
    return () => {
      cancelled = true;
      s.unsubscribe();
    };
  }, [courseId]);

  useEffect(() => {
    if (!courseId) {
      return;
    }

    let cancelled = false;
    const s = lessonService
      .getLessonBS({ filter: { courseId }})
      .subscribe(o => {
        if (!o || cancelled) {
          return;
        }
        if (o instanceof Error) {
          const error = o;
          const errorIsUnknown = !(Object.values(ECommonErrorTypes) as string[]).includes(error.message);
          const errorType = errorIsUnknown ? ECommonErrorTypes.Other : error.message as ECommonErrorTypes;
          setLessonsState({ state: { type: 'error', error, errorType }, lessons: [] });
          return;
        }
        setLessonsState({ state: { type: 'idle' }, lessons: o.lessons });
      });
    return () => {
      cancelled = true;
      s.unsubscribe();
    };
  }, [courseId]);

  useEffect(() => {
    if (!courseId || !authedUser?.email) {
      return;
    }

    let cancelled = false;
    dataService.access
      .get(courseId, authedUser?.email)
      .then(a => {
        if (cancelled || !a) {
          return;
        }

        setAccess(a);
      });

    dataService.userCourseProgress
      .get(courseId, authedUser?.email)
      .then(a => {
        if (cancelled || !a) {
          return;
        }

        setUserCourseProgress(a);
      });
    return () => {
      cancelled = true;
    };
  }, [courseId, authedUser?.email]);

  console.log({ access, userCourseProgress })

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

  const firstNotLearnedLesson = useMemo(() => {
    if (!userCourseProgress) {
      return undefined;
    }

    const sortedA = lessons
      .sort((a, b) => {
        const key = a.topicOrder != b.topicOrder ? 'topicOrder' : 'orderInTopic';
        return a[key] - b[key];
      })
    const one = sortedA.find(l => !userCourseProgress[l.id]);
    // console.log({ sortedA, one });
    return one;
  }, [userCourseProgress, lessons]);

  // console.log({ firstNotLearnedLesson })

  const groupes: IGroup[] = useMemo(() => {
    const getKey = (topic: string, topicOrder: number) => `${topic}-${topicOrder}`;
    return [...filteredLessons
      .reduce((acc, lessonData) => {
        const key = getKey(lessonData.topic, lessonData.topicOrder);
        const canBeAccessed = !firstNotLearnedLesson ? false
          : firstNotLearnedLesson.topicOrder === lessonData.topicOrder
            ? firstNotLearnedLesson.orderInTopic >= lessonData.orderInTopic
            : firstNotLearnedLesson.topicOrder > lessonData.topicOrder;

        // console.log({
        //   canBeAccessed,
        //   firstNotLearnedLesson: {
        //     topic: firstNotLearnedLesson?.topic,
        //     title: firstNotLearnedLesson?.title,
        //     topicOrder: firstNotLearnedLesson?.topicOrder,
        //     orderInTopic: firstNotLearnedLesson?.orderInTopic,
        //   },
        //   lesson: {
        //     topic: lessonData.topic,
        //     title: lessonData.title,
        //     topicOrder: lessonData?.topicOrder,
        //     orderInTopic: lessonData?.orderInTopic,
        //   }
        // })
        if (!acc.has(key)) {
          acc.set(key, {
            topic: lessonData.topic,
            topicOrder: lessonData.topicOrder,
            isFree: true,
            lessons: [{ ...lessonData, canBeAccessed }],
          })
        } else {
          const group = acc.get(key)!;
          group.lessons.push({ ...lessonData, canBeAccessed });
          group.lessons.sort((a, b) => a.orderInTopic - b.orderInTopic);
        }

        return acc;
      }, new Map() as Map<string, IGroup>)
      .values()]
      .sort((a, b) => a.topicOrder - b.topicOrder);

  }, [filteredLessons, firstNotLearnedLesson]);

  console.log({ groupes });

  const fallback = useFallback({ courseState, lessonsState });
  if (!courseState.course || !lessonsState.lessons || !lessonsState.lessons.length) {
    return fallback;
  }

  return (
    <>
      <Page variant={EPageVariant.LMS} header footer>
        <div className={classesHeader.title + ' s-text-28'}>{courseState.course.title}</div>
        {filteredLessons.length ? (
          <div className={classesList.wrapper}>
              {groupes.map((group, index) => {
                const totalDurationMinutes = group.lessons.reduce((acc, l) => acc + durationToMinutes(l.duration), 0);
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
                            <span className={classesList.infoItem + ' s-text-16'}>{`${group.lessons.length} урока`}</span>
                            <span className={classesList.infoItem + ' s-text-16'}>{`≈ ${Math.round(totalDurationMinutes / 6) / 10} ч  `}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        ) : (
          <div>{t(`courseNotStartedYet.${courseState.course.type}`, { minStartDate: formatDate(courseState.course.startDate, { timeZone: 'Europe/Moscow' }) })}</div>
        )}
      </Page>
      {openedTopic && courseId && (
        <LessonsPopup
          courseId={courseId}
          lessons={groupes.find(g => g.topic === openedTopic)!.lessons}
          onClose={() => setOpenedTopic(null)}
        />
      )}
    </>
  );
}

function durationToMinutes(duration: { unit: 'minutes' | 'hours', value: number }) {
  return (duration.unit === 'hours' ? 60 : 1) * duration.value;
}
