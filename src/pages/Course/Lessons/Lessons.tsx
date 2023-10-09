import { connect } from 'react-redux';
import { useParams } from 'react-router';

import { useFetch, useGuid } from 'hooks';
import { Fragment, useEffect, useMemo } from 'react';
import { formatI18nT, i18n } from 'shared';
import { IFetchCoursePayload, IFetchLessonsPayload, fetchCourse, fetchLessons } from 'store/actions/sagas';

import useFallback from './useFallback';

import Link from 'ui/Link/Link';
import Page from 'ui/Page/Page';
import classesHeader from './LessonsHeader.module.scss';
import classesList from './LessonsList.module.scss';

import { URLSections, type ICourseState, type ILessonsState, type IRootState } from 'types';

export default connect(mapStateToProps)(Lessons);

interface IConnectedProps {
  courseState: ICourseState
  lessonsState: ILessonsState
  authedUserId?: string
}

function mapStateToProps(state: IRootState): IConnectedProps {
  return {
    courseState: state.course,
    lessonsState: state.lessons,
    authedUserId: state.user?.user?.id,
  };
}

const t = formatI18nT('courseLessons');

function Lessons({ courseState, lessonsState, authedUserId }: IConnectedProps) {
  const { courseId } = useParams();
  const [guid, refetch] = useGuid();

  useEffect(() => {
    refetch();
  }, [authedUserId]);

  useFetch<IFetchCoursePayload>(({
    actionCreator: fetchCourse,
    payload: {
      courseId: courseId ?? '',
    }
  }));

  useFetch<IFetchLessonsPayload & { guid: string }>(({
    actionCreator: fetchLessons,
    payload: {
      filter: { courseId: courseId ?? '' },
      guid,
    }
  }));

  const lessons = lessonsState?.lessons;

  const groupes: IGroupOfGroupes[] = useMemo(() => {
    if (!lessons) {
      return [];
    }

    return [...lessons
      .reduce((acc, lessonData) => {
        if (!acc.has(lessonData.lesson.week)) {
          acc.set(lessonData.lesson.week, {
            week: lessonData.lesson.week,
            startDate: lessonData.lesson.startDate,
            endDate: lessonData.lesson.endDate,
            lessons: [lessonData],
          })
        } else {
          acc.get(lessonData.lesson.week)!.lessons.push(lessonData);
        }

        return acc;
      }, new Map() as Map<number, { lessons: ILessonsState['lessons'], week: number, startDate: Date, endDate: Date }>)
      .values()]
      .map(p => {
        const groupes = [...p.lessons
          .reduce((acc, lesson) => {
            if (!acc.has(lesson.lesson.title)) {
              acc.set(lesson.lesson.title, {
                lessonTitle: lesson.lesson.title,
                lessons: [lesson],
              });
            } else {
              acc.get(lesson.lesson.title)!.lessons.push(lesson);
            }
            return acc;
          }, new Map() as Map<string, IGroup>)
          .values()];
          return {
            groupes,
            week: p.week,
            startDate: p.startDate,
            endDate: p.endDate,
          };
      })
      // TODO sort lessons infos by ???
      .sort((a, b) => a.week - b.week);

  }, [lessons]);

  const fallback = useFallback({ courseState, lessonsState });
  if (!courseState.data || !lessonsState.lessons || !lessonsState.lessons.length) {
    return fallback;
  }

  return (
  <Page header footer wrapper='Lessons'>

    <div className={classesHeader._}>
    <div className={classesHeader.title + ' s-text-56'}>{courseState.data.title}</div>
      <div className={classesHeader.subTitle + ' s-text-24'}>{t('subTitle')}</div>
      <div className={classesHeader.links}>
        <a className='key-link  s-text-18'>{t('linksAbout')}</a>
        <a className='key-link  s-text-18'>{t('linksTelegram')}</a>
      </div>
    </div>
    <div className={classesList.wrapper}>
      <div className={classesList.list}>
        {renderGroups(groupes)}
      </div>
    </div>
  </Page>);
}

interface IGroupOfGroupes {
  groupes: IGroup[]
  week: number
  startDate: Date
  endDate: Date
}

interface IGroup {
  lessonTitle: string
  lessons: ILessonsState['lessons']
}

function renderGroups(props: IGroupOfGroupes[]) {
  return props.map((d, index) => (<Fragment key={index}>{renderGroup(d)}</Fragment>));
}

function renderGroup(props: IGroupOfGroupes) {
  return (
    <div className={classesList.itemWrapper}>
      <div className={classesList.itemDate + ' s-text-28'}>{formatWeekDate(props.startDate, props.endDate)}</div>
      {renderItems(props.groupes)}
    </div>
  );
}

function renderItems(props: IGroup[]) {
  return props.map((g, index) => (<Fragment key={index}>{renderItem(g.lessons, g.lessonTitle)}</Fragment>));
}

function getLinks(props: ILessonsState['lessons'][number]) {
  const { courseId, id } = props.lesson;

  const lectureLink = props.lesson.type === 'Theory' ? URLSections.Course.Lesson.to({ courseId, lessonId: id }) : null;
  const homeworkLink = props.lesson.type === 'Practice' ? URLSections.Course.Lesson.to({ courseId, lessonId: id }) : null;

  return { lectureLink, homeworkLink };
}

function renderItem(lessons: ILessonsState['lessons'], lessonTitle: string) {
  const links = lessons.map(getLinks);

  const lectureLinks = (links
    .map(link => link.lectureLink)
    .filter(lectureLink => lectureLink != null) as string[])
    .map(lectureLink => (
      <div className={classesList.itemLink}>
        <Link className='link s-text-18' to={lectureLink}>{t('lecture')}</Link>
      </div>
      )
    );
  const homeworkLinks = (links
    .map(link => link.homeworkLink)
    .filter(homeworkLink => homeworkLink != null) as string[])
    .map(homeworkLink => (
      <div className={classesList.itemLink}>
        <Link className='link s-text-18' to={homeworkLink}>{t('homework')}</Link>
      </div>
      )
    );

  return (
    <div className={classesList.item}>
      <div className={classesList.itemTitle + ' s-text-21'}>{lessonTitle}</div>
      <div className={classesList.itemLinks}>
        {lectureLinks}
        {homeworkLinks}
        {/* {props.lesson.webinarLink && <div className={classesList.itemLink}><a className='link s-text-18' href={props.lesson.webinarLink}>{t('webinar')}</a></div>} */}
        {/* {props.lesson.resultsLink && <div className={classesList.itemLink}><a className='link s-text-18' href={props.lesson.resultsLink}>{t('results')}</a></div>} */}
      </div>
    </div>
  );
}

function formatWeekDate(startDate: Date, endDate: Date) {
  const startDateStr = startDate.toLocaleDateString(
    ['ru-RU'],
    { month: 'long', day: 'numeric' }
  );
  const endDateStr = endDate.toLocaleDateString(
    ['ru-RU'],
    { month: 'long', day: 'numeric' }
  );

  return `${startDateStr} – ${endDateStr}`;
}
