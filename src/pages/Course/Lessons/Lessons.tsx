import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router';

import { formatI18nT } from 'shared';
import { ECommonErrorTypes, URLSections } from 'types';

import { userService } from 'services/user.service';
import { ILessonData, TLessonState, lessonService } from 'services/lesson.service';
import { ICourseData, TCourseState, courseService } from 'services/course.service';
import { TCourseError } from 'services/course.service/types';
import { TAccess } from 'services/data.service/Access';
import { TUserCourseProgress } from 'services/data.service/UserCourseProgress';
import { dataService } from 'services';

import LessonsPopup from 'components/LessonsPopup/LessonsPopup';
import Link from 'ui/Link/Link';
import Page, { EPageVariant } from 'ui/Page/Page';

import useFallback from './useFallback';

import classesList from './LessonsList.module.scss';
import classes from './Lessons.module.scss';

interface IGroup {
  topic: string
  topicOrder: number
  isFree: boolean
  lessons: (ILessonData & { solved: boolean, canBeAccessed: boolean })[]
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

    return lessons
      .sort((a, b) => {
        const key = a.topicOrder != b.topicOrder ? 'topicOrder' : 'orderInTopic';
        return a[key] - b[key];
      })
      .find(l => !userCourseProgress[l.id]);
  }, [userCourseProgress, lessons]);


  const groupes: IGroup[] = useMemo(() => {
    const getKey = (topic: string, topicOrder: number) => `${topic}-${topicOrder}`;
    return [...filteredLessons
      .reduce((acc, lessonData) => {
        const key = getKey(lessonData.topic, lessonData.topicOrder);
        const solved = userCourseProgress?.[lessonData.id] ?? false;
        const canBeAccessed = !firstNotLearnedLesson ? false
          : firstNotLearnedLesson.topicOrder === lessonData.topicOrder
            ? firstNotLearnedLesson.orderInTopic >= lessonData.orderInTopic
            : firstNotLearnedLesson.topicOrder > lessonData.topicOrder;

        if (!acc.has(key)) {
          acc.set(key, {
            topic: lessonData.topic,
            topicOrder: lessonData.topicOrder,
            isFree: lessonData.isFree,
            lessons: [{ ...lessonData, canBeAccessed, solved }],
          })
        } else {
          const group = acc.get(key)!;
          group.isFree = group.isFree && lessonData.isFree;
          group.lessons.push({ ...lessonData, canBeAccessed, solved });
          group.lessons.sort((a, b) => a.orderInTopic - b.orderInTopic);
        }

        return acc;
      }, new Map() as Map<string, IGroup>)
      .values()]
      .sort((a, b) => a.topicOrder - b.topicOrder);

  }, [filteredLessons, firstNotLearnedLesson, userCourseProgress]);

  const fallback = useFallback({ courseState, lessonsState });
  if (!courseState.course || !lessonsState.lessons || !lessonsState.lessons.length) {
    return fallback;
  }

  const freeGroupes = groupes.filter(g => g.isFree);
  const payableGroupes = groupes.filter(g => !g.isFree);

  return (
    <>
      <Page variant={EPageVariant.LMS} header footer>
        <div className={classes.profilePage}>
          <div className={classes.title}>{courseState.course.title}</div>
          <div className={classes.profilePageContent}>
            {firstNotLearnedLesson ? (
              <div className={classes.currentLesson}>
                <div className={classes.currentLessonWrapper}>
                  <div className={classes.currentLessonReminder}>
                    <div className={classes.currentLessonSubtitle + ' s-text-16'}>
                      <div className={classes.currentLessonSubtitleIndex}>{firstNotLearnedLesson.orderInTopic}.</div>
                      <span>{firstNotLearnedLesson.title}</span>
                    </div>
                    <div className={classes.currentLessonTitle + ' s-text-24'}>
                      {firstNotLearnedLesson.topic}
                    </div>
                    <div className={classes.currentLessonDetails}></div>
                    <div>
                      <Link
                        className={classes.currentLessonButton + ' s-text-18'}
                        to={URLSections.Course.Lesson.to({ courseId: courseState.course.id, lessonId: firstNotLearnedLesson.id })}
                      >
                        Учиться
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div>Реклама</div>
            )}
            <div className={classes.program}>
              <div className={classes.programTitle}>Доступно сейчас и бесплатно</div>
                <div className={classesList.wrapper}>
                    {freeGroupes.map((group, index) => {
                      const totalDurationMinutes = group.lessons.reduce((acc, l) => acc + durationToMinutes(l.duration), 0);
                      return (
                        <div className={classesList.itemWrapper} onClick={() => setOpenedTopic(group.topic)}>
                          <div key={index} className={classesList.item}>
                            <div className={classesList.imageWrapper}/>
                            <div className={classesList.itemBody}>
                              <div className={classesList.itemBodyContainer}>
                                <div className={classesList.titleContainer}>
                                  <h2 className={classesList.title + ' s-text-24'}>
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
            </div>
            <div className={classes.program}>
              <div className={classes.programTitle}>Будет доступно после оплаты</div>
                <div className={classesList.wrapper}>
                    {payableGroupes.map((group, index) => {
                      const totalDurationMinutes = group.lessons.reduce((acc, l) => acc + durationToMinutes(l.duration), 0);
                      return (
                        <div className={classesList.itemWrapper} onClick={() => setOpenedTopic(group.topic)}>
                          <div key={index} className={classesList.item}>
                            <div className={classesList.imageWrapper}/>
                            <div className={classesList.itemBody}>
                              <div className={classesList.itemBodyContainer}>
                                <div className={classesList.titleContainer}>
                                  <h2 className={classesList.title + ' s-text-24'}>
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
            </div>
          </div>
        </div>
      </Page>
      {openedTopic && courseId && authedUser && (
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
