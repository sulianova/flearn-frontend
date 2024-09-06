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

interface IGroup extends Pick<ILessonData, 'topic' | 'topicOrder' | 'topicIcon'> {  
  isFree: boolean
  isFirstUnsolved: boolean
  solved: boolean
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

  const groupes: IGroup[] = useMemo(() => {
    const getKey = (topic: string, topicOrder: number) => `${topic}-${topicOrder}`;
    const firstNotSolvedLesson = courseLessons.find(l => !l.solved);
    return [...courseLessons
      .reduce((acc, lessonData) => {
        const key = getKey(lessonData.topic, lessonData.topicOrder);

        if (!acc.has(key)) {
          acc.set(key, {
            topic: lessonData.topic,
            topicOrder: lessonData.topicOrder,
            topicIcon: lessonData.topicIcon,
            isFree: lessonData.isFree,
            isFirstUnsolved: Boolean(firstNotSolvedLesson && lessonData.id === firstNotSolvedLesson.id),
            solved: lessonData.solved,
            lessons: [lessonData],
          })
        } else {
          const group = acc.get(key)!;
          group.isFree = group.isFree && lessonData.isFree;
          group.isFirstUnsolved = group.isFirstUnsolved || Boolean(firstNotSolvedLesson && lessonData.id === firstNotSolvedLesson.id);
          group.solved = group.solved && lessonData.solved;
          group.lessons.push(lessonData);
          group.lessons.sort((a, b) => a.orderInTopic - b.orderInTopic);
        }

        return acc;
      }, new Map() as Map<string, IGroup>)
      .values()]
      .sort((a, b) => a.topicOrder - b.topicOrder);
  }, [courseLessons]);

  const freeGroupes = groupes.filter(g => g.isFree);
  const payableGroupes = groupes.filter(g => !g.isFree);

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
              groups={[...freeGroupes, ...payableGroupes]}
              setOpenedTopic={setOpenedTopic}
            />
          ) : (
            <>
              <TopicCards
                title='Доступно сейчас и бесплатно'
                groups={freeGroupes}
                setOpenedTopic={setOpenedTopic}
              />
              <TopicCards
                title='Будет доступно после оплаты'
                groups={payableGroupes}
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

function TopicCards(props: { title: string, groups: IGroup[], setOpenedTopic: (topic: string) => void }) {
  const { title, groups, setOpenedTopic } = props;
  return (
    <div className={classes.level}>
      <div className={classes.levelTitle}>{title}</div>
        <div className={classes.wrapper}>
          {groups.map((group, index) => (
            <TopicCard
              key={index}
              group={group}
              setOpenedTopic={setOpenedTopic}
            />
          ))}
      </div>
    </div>
  );
}

function TopicCard(props: { group: IGroup, setOpenedTopic: (topic: string) => void }) {
  const { group, setOpenedTopic } = props;
  const totalDurationMinutes = group.lessons.reduce((acc, l) => acc + durationToMinutes(l.duration), 0);
  const totalDurationStr = totalDurationMinutes >= 60
    ? `${Math.round(totalDurationMinutes / 6) / 10} ч`
    : `${Math.round(totalDurationMinutes)} мин`;
  return (
    <div className={classes.itemWrapper} onClick={() => setOpenedTopic(group.topic)}>
      <div className={cx({ item: true, featured: group.isFirstUnsolved })}>
        <div className={classes.imageWrapper}>
          <div className={classes.image}>
            <Icon icon={group.topicIcon}/>
          </div>
        </div>
        <div className={classes.itemBody}>
          <div className={classes.itemBodyContainer}>
            <div className={classes.titleContainer}>
              <h2 className={classes.title}>
                {group.topic}
              </h2>
            </div>
          </div>
          <div className={classes.info}>
            <div className={classes.infoMain}>
              <span className={classes.infoItem}>{i18n.t('lesson.p', { count: group.lessons.length })}</span>
              <span className={classes.infoItem}>{`${totalDurationStr}  `}</span>
            </div>
          </div>
        </div>
        <div className={cx({ itemStatus: true, solved: group.solved })}>
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