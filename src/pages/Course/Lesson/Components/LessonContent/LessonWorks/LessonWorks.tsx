import classNames from 'classnames/bind';
import { useMemo, useState } from 'react';
import { Fragment } from 'react';
import { formatI18nT } from 'shared';
import { IHomeworkData } from 'types';
import LessonReview from '../LessonReview/LessonReview';
import LessonWork from '../LessonWork/LessonWork';
import classes from './LessonWorks.module.scss';
import WorkCard from './WorkCard';

export default LessonWorks;
const cx = classNames.bind(classes);
const t = formatI18nT('courseLesson.works');

interface IProps {
  selectedUser: { id: string, displayName: string } | null
  setSelectedUser: (u: { id: string, displayName: string } | null) => void
  homework?: IHomeworkData
}

function LessonWorks({ selectedUser, setSelectedUser, homework }: IProps) {
  const fetchedHomeworks = getHomeworks();

  const selectedHomework = useMemo(() => {
    return fetchedHomeworks.find(hw => hw.user.id === selectedUser?.id);
  },                               [fetchedHomeworks, selectedUser]);

  if (selectedHomework) {
    return (
    <Fragment>
      <LessonWork homework={selectedHomework}/>
      <LessonReview homework={selectedHomework}/>
    </Fragment>);
  }

  return (
    <div className={classes._}>
      <div className={classes.wrapper}>
        <div className={classes.own}>
          <div className={classes.ownTitle + ' s-text-36'}>{t('ownTitle')}</div>
            <a className={cx({ ownWork: true, ownWorkEmpty: !homework })} href='homework-editor.html'>
              {homework ?
                (<WorkCard homework={homework} handleClick={setSelectedUser}/>)
                : (<div className='s-text-14'>{t('subTitle')}</div>)
              }
            </a>
        </div>
          <div className={classes.list}>
            <div className={classes.listTitle + ' s-text-36'}>{t('listTitle')}</div>
            <div className={classes.listInner}>
              {renderWorkCards({ setSelectedUser, homeworks: fetchedHomeworks })}
            </div>
            <div className={classes.showMore}>
              <button className={classes.showMoreBtn + ' s-text-21-uppercase inline-link'}>
                <span className='inline-link-text'>{t('showMoreBtn')}</span>
                <span className='inline-link-arrow'>↓</span>
              </button>
            </div>
          </div>
      </div>
    </div>
  );
}

interface IRenderWorkCardProps {
  setSelectedUser: (u: { id: string, displayName: string } | null) => void
  homework: IHomeworkData
}

function renderWorkCard({ setSelectedUser, homework }: IRenderWorkCardProps) {
  return (
    <div className={classes.work}><WorkCard homework={homework} handleClick={setSelectedUser}/></div>
  );
}

interface IRenderWorkCardsProps {
  setSelectedUser: (u: { id: string, displayName: string } | null) => void
  homeworks: IHomeworkData[]
}

function renderWorkCards({ setSelectedUser, homeworks }: IRenderWorkCardsProps) {
  return homeworks.map((homework, index) => (<Fragment key={index}>{renderWorkCard({ setSelectedUser, homework })}</Fragment>));
}

function getHomeworks() {
  return allHomeworks;
}

const allHomeworks: IHomeworkData[] = [
  {
    id: '2_some-user-id',
    user: {
      id: 'sonia',
      displayName: 'Sofiia ulianova',
    },
    text: 'Это мое описание первого задания на курса. Это мое описание первого задания на курса. Это мое описание первого задания на курса. Это мое описание первого задания на курса. Это мое описание первого задания на курса.',
    reference: {
      tag: 'a',
      content: 'Это мое описание первого задания на курса.',
    },
    images: [
      {
        imageSrc: 'TheStrangerVisitingNatureSusl',
        imageAlt: 'TheStrangerVisitingNatureSusl',
      },
      {
        imageSrc: 'TheStrangerVisitingNatureSusl',
        imageAlt: 'TheStrangerVisitingNatureSusl',
      },
      {
        imageSrc: 'TheStrangerVisitingNatureSusl',
        imageAlt: 'TheStrangerVisitingNatureSusl',
      },
      {
        imageSrc: 'SummerTime',
        imageAlt: 'SummerTime',
      },
      {
        imageSrc: 'TheStrangerVisitingNatureSusl',
        imageAlt: 'TheStrangerVisitingNatureSusl',
      },
      {
        imageSrc: 'TheStrangerVisitingNatureSusl',
        imageAlt: 'TheStrangerVisitingNatureSusl',
      },
      {
        imageSrc: 'SummerTime',
        imageAlt: 'SummerTime',
      },
      {
        imageSrc: 'SummerTime',
        imageAlt: 'SummerTime',
      },
      {
        imageSrc: 'SummerTime',
        imageAlt: 'SummerTime',
      },
    ],
    review: [
      { type: 'text', text: [
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              props: { className: 'textSmall' },
              content: 'Обратная связь по первому заданию. ',
            },
            {
              tag: 'span',
              content: 'Это мое описание первого задания на курса. Это мое описание первого задания на курса. Это мое описание первого задания на курса. Это мое описание первого задания на курса.',
            },
          ],
        },
      ]},
      { type: 'gallery', images: [
        {
          imageSrc: 'TheStrangerVisitingNatureSusl',
          imageAlt: 'TheStrangerVisitingNatureSusl',
        },
        {
          imageSrc: 'SummerTime',
          imageAlt: 'SummerTime',
        },
      ] },
    ],
  },
  {
    id: '2_some-user-id',
    user: {
      id: 'vova',
      displayName: 'Vladimir',
    },
    text: 'Это мое описание первого задания на курса. Это мое описание первого задания на курса. Это мое описание первого задания на курса. Это мое описание первого задания на курса. Это мое описание первого задания на курса.',
    reference: {
      tag: 'a',
      content: 'Это мое описание первого задания на курса.',
    },
    images: [
      {
        imageSrc: 'TheStrangerVisitingNatureSusl',
        imageAlt: 'TheStrangerVisitingNatureSusl',
      },
      {
        imageSrc: 'TheStrangerVisitingNatureSusl',
        imageAlt: 'TheStrangerVisitingNatureSusl',
      },
      {
        imageSrc: 'TheStrangerVisitingNatureSusl',
        imageAlt: 'TheStrangerVisitingNatureSusl',
      },
      {
        imageSrc: 'SummerTime',
        imageAlt: 'SummerTime',
      },
      {
        imageSrc: 'TheStrangerVisitingNatureSusl',
        imageAlt: 'TheStrangerVisitingNatureSusl',
      },
      {
        imageSrc: 'TheStrangerVisitingNatureSusl',
        imageAlt: 'TheStrangerVisitingNatureSusl',
      },
      {
        imageSrc: 'SummerTime',
        imageAlt: 'SummerTime',
      },
      {
        imageSrc: 'SummerTime',
        imageAlt: 'SummerTime',
      },
      {
        imageSrc: 'SummerTime',
        imageAlt: 'SummerTime',
      },
    ],
  },
];
