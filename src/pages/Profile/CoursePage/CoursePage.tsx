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
    return [...courseLessons
      .reduce((acc, lessonData) => {
        const key = getKey(lessonData.topic, lessonData.topicOrder);

        if (!acc.has(key)) {
          acc.set(key, {
            topic: lessonData.topic,
            topicOrder: lessonData.topicOrder,
            topicIcon: lessonData.topicIcon,
            isFree: lessonData.isFree,
            solved: lessonData.solved,
            lessons: [lessonData],
          })
        } else {
          const group = acc.get(key)!;
          group.isFree = group.isFree && lessonData.isFree;
          group.solved = group.solved && lessonData.solved;
          group.lessons.push(lessonData);
          group.lessons.sort((a, b) => a.orderInTopic - b.orderInTopic);
        }

        return acc;
      }, new Map() as Map<string, IGroup>)
      .values()]
      .sort((a, b) => a.topicOrder - b.topicOrder);
  }, [courseLessons]);

  const firstNotSolvedLesson = courseLessons.find(l => !l.solved);
  const freeGroupes = groupes.filter(g => g.isFree);
  const payableGroupes = groupes.filter(g => !g.isFree);

  return (
    (currentCourseAccess !== 'FREE' || authedUser.role === 'support') ? (
      <div className={classes.coursePage}>
        <div className={classes.main}>
          <div className={classes.level}>
            <div className={classes.levelTitle}>Модули</div>
              <div className={classes.wrapper}>
                {[...freeGroupes, ...payableGroupes].map((group, index) => (
                  <TopicCard
                    key={index}
                    group={group}
                    setOpenedTopic={setOpenedTopic}
                  />
                ))}
            </div>
          </div>
        </div>
        <aside className={classes.asideWrapper}>
          <div className={classes.aside}>
            <div className={classes.asideSection}>
              <div className={classes.sectionSubtitle}>Ключевые навыки</div>
              <div className={classes.chipsSmall}>
                <div className={classes.chipSmall}>Выделение главного</div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    ) : (
      <div className={classes.coursePage}>
        <div className={classes.main}>
          <div className={classes.level}>
            <div className={classes.levelTitle}>Доступно сейчас и бесплатно</div>
              <div className={classes.wrapper}>
                {freeGroupes.map((group, index) => (
                  <TopicCard
                    key={index}
                    group={group}
                    setOpenedTopic={setOpenedTopic}
                  />
                ))}
            </div>
          </div>
          <div className={classes.level}>
            <div className={classes.levelTitle}>Будет доступно после оплаты</div>
              <div className={classes.wrapper}>
                {payableGroupes.map((group, index) => (
                  <TopicCard
                    key={index}
                    group={group}
                    setOpenedTopic={setOpenedTopic}
                  />
                ))}
            </div>
          </div>
        </div>
        <aside className={classes.asideWrapper}>
          <div className={classes.aside}>
            <div className={classes.asideSection}>
              <div className={classes.sectionSubtitle}>Ключевые навыки</div>
              <div className={classes.chipsSmall}>
                <div className={classes.chipSmall}>Выделение главного</div>
              </div>
            </div>
          </div>
        </aside>
        {openedTopic && (
          <LessonsPopup
            courseId={currentCourse.id}
            topic={openedTopic}
            close={() => setOpenedTopic(null)}
          />
        )}
      </div>
    )
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
      <div className={cx({ item: true, featured: false })}>
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
      </div>
    </div>
  );
}

function durationToMinutes(duration: { unit: 'minutes' | 'hours', value: number }) {
  return (duration.unit === 'hours' ? 60 : 1) * duration.value;
}