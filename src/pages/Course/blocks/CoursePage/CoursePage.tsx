import classnames from 'classnames/bind';
import { useMemo } from 'react';

import { URLSections } from 'router';
import { type IUserData } from 'services/user.service';
import { type ILessonData } from 'services/lesson.service';
import { type ICourseData } from 'services/course.service';
import { type TAccess } from 'services/userAccess.service';

import Icon from 'ui/Icon/Icon';
import Link from 'ui/Link/Link';

import classes from './CoursePage.module.scss';

const cx = classnames.bind(classes);

interface ITopic {
  title: string
  order: number
  icon: ILessonData['topicIcon']
  isFree: boolean
  // isSolved: boolean
  // isFirstUnsolved: boolean
  // isUnderDevelopment: boolean
  lessons: (ILessonData & { solved: boolean, canBeAccessed: boolean, isFirstUnsolved: boolean })[]
}

interface IProps {
  authedUser: IUserData | null
  currentCourse: ICourseData
  courseLessons: Array<ILessonData & { solved: boolean, canBeAccessed: boolean }>
  currentCourseAccess: TAccess | null
}

export default function CoursePage(props: IProps) {
  const { authedUser, currentCourse, courseLessons, currentCourseAccess } = props;

  const topics: ITopic[] = useMemo(() => {
    const getKey = (topic: string, topicOrder: number) => `${topic}-${topicOrder}`;
    const firstUnolvedLesson = courseLessons.find(l => !l.solved);
    return [...courseLessons
      .reduce((acc, lessonData) => {
        const key = getKey(lessonData.topic, lessonData.topicOrder);

        if (!acc.has(key)) {
          acc.set(key, {
            title: lessonData.topic,
            order: lessonData.topicOrder,
            icon: lessonData.topicIcon,
            isFree: lessonData.isFree,
            // isSolved: lessonData.solved,
            // isFirstUnsolved: Boolean(firstUnolvedLesson && lessonData.id === firstUnolvedLesson.id),
            // isUnderDevelopment: lessonData.isUnderDevelopment,
            lessons: [{ ...lessonData, isFirstUnsolved: Boolean(firstUnolvedLesson && lessonData.id === firstUnolvedLesson.id) }],
          })
        } else {
          const topic = acc.get(key)!;
          topic.isFree &&= lessonData.isFree;
          // topic.isSolved &&= lessonData.solved;
          // topic.isFirstUnsolved ||= Boolean(firstNotSolvedLesson && lessonData.id === firstNotSolvedLesson.id);
          // topic.isUnderDevelopment &&= lessonData.isUnderDevelopment;
          topic.lessons.push({ ...lessonData, isFirstUnsolved: Boolean(firstUnolvedLesson && lessonData.id === firstUnolvedLesson.id) });
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
          {((currentCourseAccess ?? 'FREE') !== 'FREE' || authedUser?.role === 'support') ? (
            <Topics
              title='Модули'
              topics={[...freeTopics, ...payableTopics]}
            />
          ) : (
            <>
              <Topics
                title='Доступно сейчас и бесплатно'
                topics={freeTopics}
              />
              <Topics
                title='Будет доступно после оплаты'
                topics={payableTopics}
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
      {/* {openedTopic && (
        <LessonsPopup
          courseId={currentCourse.id}
          topic={openedTopic}
          close={() => onTopicClick(null)}
        />
      )}
      {signupToCoursePopupIsOpened && (
        <SignupToCoursePopup
          course={currentCourse}
          option='OPTIMAL'
          close={() => setSignupToCoursePopupIsOpened(false)}
        />
      )} */}
    </>
  );
}

function Topics(props: { topics: ITopic[], title: string }) {
  const { title, topics } = props;
  return (
    <>
      <h2>{title}</h2>
      {topics.map(topic => (
        <Topic
          key={topic.title}
          topic={topic}
        />
      ))}
    </>
  );
}

function Topic(props: { topic: ITopic }) {
  const { topic } = props;
  return (
    <div className={classes.level}>
      <div className={classes.levelTitle}>{topic.title}</div>
        <div className={classes.wrapper}>
          {topic.lessons.map(lesson => (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
            />
          ))}
      </div>
    </div>
  );
}

function LessonCard(props: { lesson: ILessonData & { solved: boolean, canBeAccessed: boolean, isFirstUnsolved: boolean } }) {
  const { lesson } = props;
  const totalDurationMinutes = durationToMinutes(lesson.duration);
  const totalDurationStr = totalDurationMinutes >= 60
    ? `${Math.round(totalDurationMinutes / 6) / 10} ч`
    : `${Math.round(totalDurationMinutes)} мин`;
  
  const content = (
    <button className={cx({ item: true, featured: lesson.isFirstUnsolved })} disabled={!lesson.canBeAccessed}>
      <div className={classes.imageWrapper}>
        <div className={classes.image}>
          <Icon icon={lesson.icon}/>
        </div>
      </div>
      <div className={classes.itemBody}>
        <div className={classes.itemBodyContainer}>
          <div className={classes.titleContainer}>
            <h2 className={classes.title}>
              {lesson.title}
            </h2>
          </div>
        </div>
        <div className={classes.info}>
          <div className={classes.infoMain}>
            {/* <span className={classes.infoItem}>{i18n.t('lesson.p', { count: 1 })}</span> */}
            <span className={classes.infoItem}>{totalDurationStr}</span>
          </div>
        </div>
      </div>
      {lesson.canBeAccessed ? (
        <div className={cx({ itemStatus: true, solved: lesson.solved })}>
          <Icon icon='Tick'/>
        </div>
      ) : (
        <div className={cx({ itemStatus: true })}>
        <Icon icon='Lock'/>
      </div>
      )}
      <div className={classes.itemPopover}>Учиться</div>
      <div className={classes.background}></div>
    </button>
  );

  if (lesson.canBeAccessed) {
    return (
      <Link
        className={classes.itemWrapper}
        to={URLSections.Study.to({ courseId: lesson.courseId, lessonId: lesson.id })}
      >
        {content}
      </Link>
    );
  }

  return (
    <div
      data-locked
      className={classes.itemWrapper}
    >
      {content}
    </div>
  );
}

function durationToMinutes(duration: { unit: 'minutes' | 'hours', value: number }) {
  return (duration.unit === 'hours' ? 60 : 1) * duration.value;
}