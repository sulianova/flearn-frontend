import classnames from 'classnames/bind';
import { useMemo, useState } from 'react';

import { formatI18nT, i18n } from 'shared';
import { URLSections } from 'router';

import { type IUserData, userService } from 'services/user.service';
import { type ILessonData, lessonService } from 'services/lesson.service';
import { type ICourseData, courseService } from 'services/course.service';
import { type TAccess, userAccessService } from 'services/userAccess.service';

import BuyPopup from 'components/BuyPopup/BuyPopup';
import LessonsPopup from 'components/LessonsPopup/LessonsPopup';
import Link from 'ui/Link/Link';
import Page, { EPageVariant } from 'ui/Page/Page';
import Fallback from 'ui/Fallback';
import Icon from 'ui/Icon/Icon';

import classesList from './LessonsList.module.scss';
import classes from './Profile.module.scss';

const cx = classnames.bind(classesList);

interface IGroup extends Pick<ILessonData, 'topic' | 'topicOrder' | 'topicIcon'> {  
  isFree: boolean
  solved: boolean
  lessons: (ILessonData & { solved: boolean, canBeAccessed: boolean })[]
}

const t = formatI18nT('courseLessons');

export default function ProfileContainer() {
  const authedUser = userService.useAuthedUser();
  const currentCourse = courseService.useCurrentCourse();
  const courseLessons = lessonService.useCourseLessons();
  const currentCourseAccess = userAccessService.useCurrentCourseAccess();

  if (!authedUser || !currentCourse || !courseLessons || !currentCourseAccess) {
    return <Fallback.Pending text='Loading profile' headerVariant={EPageVariant.LMS}/>;
  }

  return (
    <Profile
      authedUser={authedUser}
      currentCourse={currentCourse}
      courseLessons={courseLessons}
      currentCourseAccess={currentCourseAccess}
    />
  );
}

interface IProps {
  authedUser: IUserData
  currentCourse: ICourseData
  courseLessons: Array<ILessonData & { solved: boolean, canBeAccessed: boolean }>
  currentCourseAccess: TAccess
}

function Profile(props: IProps) {
  const { authedUser, currentCourse, courseLessons, currentCourseAccess } = props;

  const [openedTopic, setOpenedTopic] = useState<string | null>(null);
  const [buyCoursePopupIsOpened, setBuyCoursePopupIsOpened] = useState(false);

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
    <>
      <Page 
        variant={EPageVariant.LMS}
        header
        footer
        backgroundColor='var(--color-background-default)'
      >
        <div className={classes.profilePage}>
          <div className={classes.profilePageContent}>
            <div className={classes.programWrapper}>
              <div className={classes.programBody}>
                <div className={classes.title}>{currentCourse.title}</div>
                <div className={classes.description}>{currentCourse.introDescription}</div>
                {firstNotSolvedLesson ? (
                        <div>
                        {!firstNotSolvedLesson.isFree && currentCourseAccess === 'FREE' && authedUser.role === 'user' ? (
                          <div
                            className={classes.currentLessonButton}
                            onClick={() => setBuyCoursePopupIsOpened(true)}
                          >
                            Купить
                          </div>
                        ) : (
                          <Link
                            className={classes.currentLessonButton}
                            to={URLSections.Study.to({ courseId: currentCourse.id, lessonId: firstNotSolvedLesson.id })}
                          >
                            Учиться
                          </Link>
                        )}
                      </div>
                ) : (
                  <div>Реклама</div>
                )}
              </div>
              <div className={classes.programImage}>
                <Icon {...currentCourse.icon}/>
              </div>
            </div>
            {(currentCourseAccess !== 'FREE' || authedUser.role === 'support') ? (
              <div className={classes.program}>
                <div className={classes.subTitle}>Модули</div>
                  <div className={classesList.wrapper}>
                    {[...freeGroupes, ...payableGroupes].map((group, index) => (
                      <TopicCard
                        key={index}
                        group={group}
                        setOpenedTopic={setOpenedTopic}
                      />
                    ))}
                </div>
              </div>
            ) : (
              <>
                <div className={classes.program}>
                  <div className={classes.subTitle}>Доступно сейчас и бесплатно</div>
                    <div className={classesList.wrapper}>
                      {freeGroupes.map((group, index) => (
                        <TopicCard
                          key={index}
                          group={group}
                          setOpenedTopic={setOpenedTopic}
                        />
                      ))}
                  </div>
                </div>
                <div className={classes.program}>
                  <div className={classes.subTitle}>Будет доступно после оплаты</div>
                    <div className={classesList.wrapper}>
                      {payableGroupes.map((group, index) => (
                        <TopicCard
                          key={index}
                          group={group}
                          setOpenedTopic={setOpenedTopic}
                        />
                      ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </Page>
      {openedTopic && (
        <LessonsPopup
          courseId={currentCourse.id}
          topic={openedTopic}
          close={() => setOpenedTopic(null)}
        />
      )}
      {buyCoursePopupIsOpened && (
        <BuyPopup
          course={currentCourse}
          user={authedUser}
          close={() => setBuyCoursePopupIsOpened(false)}
        />
      )}
    </>
  );
}

function durationToMinutes(duration: { unit: 'minutes' | 'hours', value: number }) {
  return (duration.unit === 'hours' ? 60 : 1) * duration.value;
}

function TopicCard(props: { group: IGroup, setOpenedTopic: (topic: string) => void }) {
  const { group, setOpenedTopic } = props;
  const totalDurationMinutes = group.lessons.reduce((acc, l) => acc + durationToMinutes(l.duration), 0);
  const totalDurationStr = totalDurationMinutes >= 60
    ? `${Math.round(totalDurationMinutes / 6) / 10} ч`
    : `${Math.round(totalDurationMinutes)} мин`;
  return (
    <div className={classesList.itemWrapper} onClick={() => setOpenedTopic(group.topic)}>
      <div className={classesList.item}>
        <div className={classesList.imageWrapper}>
          <div className={classesList.image}>
            <Icon icon={group.topicIcon}/>
          </div>
        </div>
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
              <span className={classesList.infoItem}>{i18n.t('lesson.p', { count: group.lessons.length })}</span>
              <span className={classesList.infoItem}>{`${totalDurationStr}  `}</span>
            </div>
          </div>
        </div>
        <div className={cx({ itemStatus: true, solved: group.solved })}>
          <Icon icon='Tick'/>
        </div>
      </div>
    </div>
  );
}
