import classnames from 'classnames/bind';
import { useEffect, useRef, useMemo, useState } from 'react';

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
  index: number
  title: string
  order: number
  icon: ILessonData['topicIcon']
  isFree: boolean
  isSolved: boolean
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
            index: 0,
            title: lessonData.topic,
            order: lessonData.topicOrder,
            icon: lessonData.topicIcon,
            isFree: lessonData.isFree,
            isSolved: lessonData.solved,
            // isSolved: lessonData.solved,
            // isFirstUnsolved: Boolean(firstUnolvedLesson && lessonData.id === firstUnolvedLesson.id),
            // isUnderDevelopment: lessonData.isUnderDevelopment,
            lessons: [{ ...lessonData, isFirstUnsolved: Boolean(firstUnolvedLesson && lessonData.id === firstUnolvedLesson.id) }],
          })
        } else {
          const topic = acc.get(key)!;
          topic.isFree &&= lessonData.isFree;
          topic.isSolved &&= lessonData.solved;
          // topic.isSolved &&= lessonData.solved;
          // topic.isFirstUnsolved ||= Boolean(firstNotSolvedLesson && lessonData.id === firstNotSolvedLesson.id);
          // topic.isUnderDevelopment &&= lessonData.isUnderDevelopment;
          topic.lessons.push({ ...lessonData, isFirstUnsolved: Boolean(firstUnolvedLesson && lessonData.id === firstUnolvedLesson.id) });
          topic.lessons.sort((a, b) => a.orderInTopic - b.orderInTopic);
        }

        return acc;
      }, new Map() as Map<string, ITopic>)
      .values()]
      .sort((a, b) => a.order - b.order)
      .map((topic, index) => ({ ...topic, index }))
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
              topics={[...freeTopics, ...payableTopics]}
            />
          ) : (
            <>
              <Topics
                topics={freeTopics}
              />
              <Topics
                topics={payableTopics}
              />
            </>
          )}
        </div>
        {Boolean(courseTags.length) && (
          <aside className={classes.asideWrapper}>
            <div className={classes.aside}>
              <div className={classes.asideSection}>
                <div className={classes.section__title}>Теги</div>
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

function Topics(props: { topics: ITopic[] }) {
  const { topics } = props;
  return (
    <>
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
  const [isExpanded, setIsExpanded] = useState(!topic.isSolved);
  const [height, setHeight] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHeight(isExpanded ? (ref.current?.scrollHeight ?? 0) : 0);
  }, [isExpanded]);

  return (
    <div className={classes.level}>
      <div className={classes.level__header}>
        <div className={classes.header__meta}>
          <div className={classes.header__meta__number}>{`Модуль ${topic.index}`}</div>
          {topic.isSolved && (
            <div className={classes.header__meta__state}>Завершен</div>
          )}
          {!topic.isFree && (
            <div className={classes.header__meta__type}>После оплаты</div>
          )}
        </div>
        <div className={classes.header__content}>
          <div className={classes.header__content__title}>
            <div className={classes.level__title}>{topic.title}</div>
            <div 
              className={cx({ level__arrow: true, arrow_expended: isExpanded })}
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <Icon icon='ChevronDown'/>
            </div>
          </div>
          <div className={classes.header__content__description}></div>
        </div>
      </div>
        <div
          className={cx({ list: true, list_expended: isExpanded })}
          ref={ref}
          style={{ height }}
        >
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
    <button className={cx({ item: true, featured: lesson.isFirstUnsolved, disabled: !lesson.canBeAccessed })} disabled={!lesson.canBeAccessed}>
      <div className={classes.item__content}>
        <div className={classes.item__image}>
          <Icon icon={lesson.icon}/>
        </div>
        <div className={classes.item__title}>
          {lesson.title}
        </div>
      </div>
      {lesson.canBeAccessed ? (
        <div className={cx({ itemStatus: true, solved: lesson.solved })}>
          <Icon icon='Tick'/>
        </div>
      ) : (
        <div className={cx({ itemStatus: true, locked: true })}>
        <Icon icon='Lock'/>
      </div>
      )}
      <div className={classes.itemPopover}>Учиться</div>
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