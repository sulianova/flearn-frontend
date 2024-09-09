import classnames from 'classnames/bind';
import { useMemo, useState } from 'react';

import { i18n } from 'shared';

import { type IUserData } from 'services/user.service';
import { type ILessonData } from 'services/lesson.service';
import { type ICourseData } from 'services/course.service';
import { type TAccess } from 'services/userAccess.service';

import Icon from 'ui/Icon/Icon';
import LessonsPopup from 'components/LessonsPopup/LessonsPopup';

import classes from './CoursePage.module.scss'

const cx = classnames.bind(classes);

interface ITopic {
  title: string
  order: number
  icon: ILessonData['topicIcon']
  isFree: boolean
  isSolved: boolean
  isFirstUnsolved: boolean
  isUnderDevelopment: boolean
  lessons: (ILessonData & { solved: boolean, canBeAccessed: boolean })[]
}

interface IProps {
  authedUser: IUserData
  currentCourse: ICourseData
  courseLessons: Array<ILessonData & { solved: boolean, canBeAccessed: boolean }>
  currentCourseAccess: TAccess
}

export default function CoursePage(props: IProps) {
  const { authedUser, currentCourse, courseLessons, currentCourseAccess } = props;
  const [openedTopic, setOpenedTopic] = useState<string | null>(null);

  const topics: ITopic[] = useMemo(() => {
    const getKey = (topic: string, topicOrder: number) => `${topic}-${topicOrder}`;
    const firstNotSolvedLesson = courseLessons.find(l => !l.solved);
    return [...courseLessons
      .reduce((acc, lessonData) => {
        const key = getKey(lessonData.topic, lessonData.topicOrder);

        if (!acc.has(key)) {
          acc.set(key, {
            title: lessonData.topic,
            order: lessonData.topicOrder,
            icon: lessonData.topicIcon,
            isFree: lessonData.isFree,
            isSolved: lessonData.solved,
            isFirstUnsolved: Boolean(firstNotSolvedLesson && lessonData.id === firstNotSolvedLesson.id),
            isUnderDevelopment: lessonData.isUnderDevelopment,
            lessons: [lessonData],
          })
        } else {
          const topic = acc.get(key)!;
          topic.isFree &&= lessonData.isFree;
          topic.isSolved &&= lessonData.solved;
          topic.isFirstUnsolved ||= Boolean(firstNotSolvedLesson && lessonData.id === firstNotSolvedLesson.id);
          topic.isUnderDevelopment &&= lessonData.isUnderDevelopment;
          topic.lessons.push(lessonData);
          topic.lessons.sort((a, b) => a.orderInTopic - b.orderInTopic);
        }

        return acc;
      }, new Map() as Map<string, ITopic>)
      .values()]
      .sort((a, b) => a.order - b.order);
  }, [courseLessons]);

  const freeTopics = topics.filter(topic => topic.isFree);
  const payableTopics = topics.filter(topic => !topic.isFree);

  const courseTags = useMemo(() => {
    return [
      ...new Set(
        (currentCourse.content.modules ?? [])
          .flatMap(module => module.tags)
          .filter(tag => tag !== undefined)
      )
    ];
  }, [currentCourse]);

  return (
    <>
      <div className={classes.coursePage}>
        <div className={classes.main}>
          {(currentCourseAccess !== 'FREE' || authedUser.role === 'support') ? (
            <TopicCards
              title='Модули'
              topics={[...freeTopics, ...payableTopics]}
              setOpenedTopic={setOpenedTopic}
            />
          ) : (
            <>
              <TopicCards
                title='Доступно сейчас и бесплатно'
                topics={freeTopics}
                setOpenedTopic={setOpenedTopic}
              />
              <TopicCards
                title='Будет доступно после оплаты'
                topics={payableTopics}
                setOpenedTopic={setOpenedTopic}
              />
            </>
          )}
        </div>
        {Boolean(courseTags.length) && (
          <aside className={classes.asideWrapper}>
            <div className={classes.aside}>
              <div className={classes.asideSection}>
                <div className={classes.sectionSubtitle}>Ключевые навыки</div>
                <div className={classes.chipsSmall}>
                  {courseTags
                    .map(tag => (
                      <div className={classes.chipSmall}>{tag}</div>
                    ))
                  }
                </div>
              </div>
            </div>
          </aside>
        )}
      </div>
      {openedTopic && (
        <LessonsPopup
          courseId={currentCourse.id}
          topic={openedTopic}
          close={() => setOpenedTopic(null)}
        />
      )}
    </>
  );
}

function TopicCards(props: { title: string, topics: ITopic[], setOpenedTopic: (topic: string) => void }) {
  const { title, topics, setOpenedTopic } = props;
  return (
    <div className={classes.level}>
      <div className={classes.levelTitle}>{title}</div>
        <div className={classes.wrapper}>
          {topics.map((topic, index) => (
            <TopicCard
              key={index}
              topic={topic}
              setOpenedTopic={setOpenedTopic}
            />
          ))}
      </div>
    </div>
  );
}

function TopicCard(props: { topic: ITopic, setOpenedTopic: (topic: string) => void }) {
  const { topic, setOpenedTopic } = props;
  const totalDurationMinutes = topic.lessons.reduce((acc, l) => acc + durationToMinutes(l.duration), 0);
  const totalDurationStr = totalDurationMinutes >= 60
    ? `${Math.round(totalDurationMinutes / 6) / 10} ч`
    : `${Math.round(totalDurationMinutes)} мин`;
  return (
    <div className={classes.itemWrapper} onClick={() => setOpenedTopic(topic.title)}>
      <div className={cx({ item: true, featured: topic.isFirstUnsolved })}>
        <div className={classes.imageWrapper}>
          <div className={classes.image}>
            <Icon icon={topic.icon}/>
          </div>
        </div>
        <div className={classes.itemBody}>
          <div className={classes.itemBodyContainer}>
            <div className={classes.titleContainer}>
              <h2 className={classes.title}>
                {topic.title}
              </h2>
            </div>
          </div>
          <div className={classes.info}>
            <div className={classes.infoMain}>
              <span className={classes.infoItem}>{i18n.t('lesson.p', { count: topic.lessons.length })}</span>
              <span className={classes.infoItem}>{`${totalDurationStr}  `}</span>
            </div>
          </div>
        </div>
        <div className={cx({ itemStatus: true, solved: topic.isSolved })}>
          <Icon icon='Tick'/>
        </div>
        <div className={classes.itemPopover}>Учиться</div>
        <div className={classes.background}></div>
      </div>
    </div>
  );
}

function durationToMinutes(duration: { unit: 'minutes' | 'hours', value: number }) {
  return (duration.unit === 'hours' ? 60 : 1) * duration.value;
}