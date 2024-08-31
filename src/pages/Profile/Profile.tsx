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
            <div className={classes.header}>
              <div className={classes.headerWrapper}>
                <div className={classes.headerContent}>
                  <div className={classes.title}>{currentCourse.title}</div>
                  <div className={classes.description}>{currentCourse.introDescription}</div>
                  <div className={classes.metaData}>
                    <div className={classes.metaData_Item}>
                      <span className={classes.metaData_ItemText}>{i18n.t(`catalogue.card.info.${currentCourse.level}`)}</span>
                    </div>
                    <div className={classes.metaData_Item}>
                      <span className={classes.metaData_ItemText}>
                        {i18n.t(`duration.${currentCourse.metaData.lessonsDuration.unit}`, { count: currentCourse.metaData.lessonsDuration.value })}
                      </span>
                    </div>
                    <div className={classes.metaData_Item}>
                      <span className={classes.metaData_ItemText}>
                        {i18n.t('lesson.p', { count: currentCourse.metaData.lessonsAmount })}
                      </span>
                    </div>
                  </div>
                </div>
                <div className={classes.headerImage}>
                  <Icon {...currentCourse.icon}/>
                </div>
                <div className={classes.shareLink}><Icon icon='Share'/></div>
              </div>
              {firstNotSolvedLesson ? (
                    <div className={classes.actions}>
                      <div className={classes.actionsBtn}>
                        {!firstNotSolvedLesson.isFree && currentCourseAccess === 'FREE' && authedUser.role === 'user' ? (
                          <div
                            className={classes.currentLessonButton}
                            onClick={() => setBuyCoursePopupIsOpened(true)}
                          >
                            Купить полный курс
                          </div>
                        ) : (
                          <Link
                            className={classes.currentLessonButton}
                            to={URLSections.Study.to({ courseId: currentCourse.id, lessonId: firstNotSolvedLesson.id })}
                          >
                            Продолжить учиться
                          </Link>
                        )}
                      </div>
                    </div>
              ) : (
                <div>Реклама</div>
              )}
            </div>
            {(currentCourseAccess !== 'FREE' || authedUser.role === 'support') ? (
              <div className={classes.coursePage}>
                <div className={classes.main}>
                  <div className={classes.level}>
                    <div className={classes.levelTitle}>Модули</div>
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
                  <div className={classes.level}>
                    <div className={classes.levelTitle}>Будет доступно после оплаты</div>
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
      <div className={cx({ item: true, featured: false })}>
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
        <div className={classesList.itemPopover}>Учиться</div>
      </div>
    </div>
  );
}
