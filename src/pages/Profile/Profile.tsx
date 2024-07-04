import { useMemo, useState } from 'react';
import { useParams } from 'react-router';

import { formatI18nT } from 'shared';
import { URLSections } from 'router';

import { userService } from 'services/user.service';
import { ILessonData, lessonService } from 'services/lesson.service';
import { courseService } from 'services/course.service';

import LessonsPopup from 'components/LessonsPopup/LessonsPopup';
import Link from 'ui/Link/Link';
import Page, { EPageVariant } from 'ui/Page/Page';
import Fallback from 'ui/Fallback';

import classesList from './LessonsList.module.scss';
import classes from './Profile.module.scss';

interface IGroup {
  topic: string
  topicOrder: number
  isFree: boolean
  lessons: (ILessonData & { solved: boolean, canBeAccessed: boolean })[]
}

const t = formatI18nT('courseLessons');

export default function Profile() {
  const { courseId } = useParams();

  const authedUser = userService.useAuthedUser();
  const currentCourse = courseService.useCurrentCourse();
  const courseLessons = lessonService.useCourseLessons();

  const [openedTopic, setOpenedTopic] = useState<string | null>(null);

  const filteredCourseLessons = useMemo(() => {
    if (!courseLessons) {
      return [];
    }

    if (authedUser?.role === 'support') {
      return courseLessons;
    }

    return courseLessons;
  }, [courseLessons, authedUser]);

  const groupes: IGroup[] = useMemo(() => {
    const getKey = (topic: string, topicOrder: number) => `${topic}-${topicOrder}`;
    return [...filteredCourseLessons
      .reduce((acc, lessonData) => {
        const key = getKey(lessonData.topic, lessonData.topicOrder);

        if (!acc.has(key)) {
          acc.set(key, {
            topic: lessonData.topic,
            topicOrder: lessonData.topicOrder,
            isFree: lessonData.isFree,
            lessons: [lessonData],
          })
        } else {
          const group = acc.get(key)!;
          group.isFree = group.isFree && lessonData.isFree;
          group.lessons.push(lessonData);
          group.lessons.sort((a, b) => a.orderInTopic - b.orderInTopic);
        }

        return acc;
      }, new Map() as Map<string, IGroup>)
      .values()]
      .sort((a, b) => a.topicOrder - b.topicOrder);

  }, [filteredCourseLessons]);

  const firstNotSolvedLesson = courseLessons?.find(l => !l.solved);

  if (!currentCourse || !courseLessons || !courseLessons.length) {
    return <Fallback.Pending text='Loading profile'/>;
  }

  const freeGroupes = groupes.filter(g => g.isFree);
  const payableGroupes = groupes.filter(g => !g.isFree);

  return (
    <>
      <Page variant={EPageVariant.LMS} header footer>
        <div className={classes.profilePage}>
          <div className={classes.title}>{currentCourse.title}</div>
          <div className={classes.profilePageContent}>
            {firstNotSolvedLesson ? (
              <div className={classes.currentLesson}>
                <div className={classes.currentLessonWrapper}>
                  <div className={classes.currentLessonReminder}>
                    <div className={classes.currentLessonSubtitle}>
                      <div className={classes.currentLessonSubtitleIndex}>{firstNotSolvedLesson.orderInTopic}.</div>
                      <span>{firstNotSolvedLesson.title}</span>
                    </div>
                    <div className={classes.currentLessonTitle}>
                      {firstNotSolvedLesson.topic}
                    </div>
                    <div className={classes.currentLessonDetails}></div>
                    <div>
                      <Link
                        className={classes.currentLessonButton}
                        to={URLSections.Study.to({ courseId: currentCourse.id, lessonId: firstNotSolvedLesson.id })}
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
                        <div key={index} className={classesList.itemWrapper} onClick={() => setOpenedTopic(group.topic)}>
                          <div className={classesList.item}>
                            <div className={classesList.imageWrapper}/>
                            <div className={classesList.itemBody}>
                              <div className={classesList.itemBodyContainer}>
                                <div className={classesList.titleContainer}>
                                  <h2 className={classesList.title}>
                                    {group.topic}
                                  </h2>
                                </div>
                              </div>
                              <div className={classesList.info}>
                                <div className={classesList.infoMain}>
                                  <span className={classesList.infoItem}>{`${group.lessons.length} урока`}</span>
                                  <span className={classesList.infoItem}>{`≈ ${Math.round(totalDurationMinutes / 6) / 10} ч  `}</span>
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
                        <div key={index} className={classesList.itemWrapper} onClick={() => setOpenedTopic(group.topic)}>
                          <div className={classesList.item}>
                            <div className={classesList.imageWrapper}/>
                            <div className={classesList.itemBody}>
                              <div className={classesList.itemBodyContainer}>
                                <div className={classesList.titleContainer}>
                                  <h2 className={classesList.title}>
                                    {group.topic}
                                  </h2>
                                </div>
                              </div>
                              <div className={classesList.info}>
                                <div className={classesList.infoMain}>
                                  <span className={classesList.infoItem}>{`${group.lessons.length} урока`}</span>
                                  <span className={classesList.infoItem}>{`≈ ${Math.round(totalDurationMinutes / 6) / 10} ч  `}</span>
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
          topic={openedTopic}
          close={() => setOpenedTopic(null)}
        />
      )}
    </>
  );
}

function durationToMinutes(duration: { unit: 'minutes' | 'hours', value: number }) {
  return (duration.unit === 'hours' ? 60 : 1) * duration.value;
}
