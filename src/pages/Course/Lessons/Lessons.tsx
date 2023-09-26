import { connect } from 'react-redux';

import { useFetch } from 'hooks';
import { Fragment } from 'react';
import { formatI18nT, i18n } from 'shared';
import { fetchCourse, fetchLessons } from 'store/actions/sagas';

import Page from 'ui/Page/Page';
import classesHeader from './LessonsHeader.module.scss';
import classesList from './LessonsList.module.scss';

import type { ILessonsState, IRootState } from 'types';
export default connect(mapStateToProps)(Lessons);

interface IConnectedProps {
  data?: ILessonsState
  lessons?: ILessonsState['lessonsInfo']
}

function mapStateToProps(state: IRootState): IConnectedProps {
  return {
    data: state.lessons,
    lessons: state.lessons?.lessonsInfo,
  };
}

const t = formatI18nT('courseLessons');

function Lessons({ data }: IConnectedProps) {
  useFetch(({ actionCreator: fetchLessons }));
  if (!data || Object.keys(data).length === 0) {
    return (
      <Page header footer wrapper='Lessons'>
        <p>loading lessons</p>
      </Page>
    );
  }

  return (
  <Page header footer wrapper='Lessons'>

    <div className={classesHeader._}>
    <div className={classesHeader.title + ' s-text-56'}>{data.courseInfo.title}</div>
      <div className={classesHeader.subTitle + ' s-text-24'}>{t('subTitle')}</div>
      <div className={classesHeader.links}>
        <a className='key-link  s-text-18'>{t('linksAbout')}</a>
        <a className='key-link  s-text-18'>{t('linksTelegram')}</a>
      </div>
    </div>
    <div className={classesList.wrapper}>
      <div className={classesList.list}>
        {renderItems(data.lessonsInfo)}
      </div>
    </div>
  </Page>);
}

function renderItem(props: ILessonsState['lessonsInfo'][number]) {
  return (
    <div className={classesList.itemWrapper}>
      <div className={classesList.itemDate + ' s-text-28'}>{props.dates}</div>
      <div className={classesList.item}>
        <div className={classesList.itemTitle + ' s-text-21'}>{props.title}</div>
        <div className={classesList.itemLinks}>
          {props.lectureLink && <div className={classesList.itemLink}><a className='link s-text-18' href={props.lectureLink}>{t('lecture')}</a></div>}
          {props.homeworkLink && <div className={classesList.itemLink}><a className='link s-text-18' href={props.homeworkLink}>{t('homework')}</a></div>}
          {props.webinarLink && <div className={classesList.itemLink}><a className='link s-text-18' href={props.webinarLink}>{t('webinar')}</a></div>}
          {props.resultsLink && <div className={classesList.itemLink}><a className='link s-text-18' href={props.resultsLink}>{t('results')}</a></div>}
        </div>
        <div className={classesList.itemTitle + ' s-text-21'}>{props.title}</div>
        <div className={classesList.itemLinks}>
          {props.lectureLink && <div className={classesList.itemLink}><a className='link s-text-18' href={props.lectureLink}>{t('lecture')}</a></div>}
          {props.homeworkLink && <div className={classesList.itemLink}><a className='link s-text-18' href={props.homeworkLink}>{t('homework')}</a></div>}
          {props.webinarLink && <div className={classesList.itemLink}><a className='link s-text-18' href={props.webinarLink}>{t('webinar')}</a></div>}
          {props.resultsLink && <div className={classesList.itemLink}><a className='link s-text-18' href={props.resultsLink}>{t('results')}</a></div>}
        </div>
      </div>
    </div>
  );
}

function renderItems(props: ILessonsState['lessonsInfo'] ) {
  return props.map((d, index) => (<Fragment key={index}>{renderItem(d)}</Fragment>));
}
