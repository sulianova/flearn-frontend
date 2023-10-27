import classNames from 'classnames/bind';
import { Fragment, useMemo } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router';

import { useFetch } from 'hooks';
import { dataService } from 'services';
import { formatI18nT } from 'shared';
import { IFetchHomeworksPayload, fetchHomeworks } from 'store/actions/sagas';

import LessonReview from './LessonReview/LessonReview';
import LessonWork from './LessonWork/LessonWork';
import WorkCard from './WorkCard/WorkCard';

import classes from './LessonWorks.module.scss';

import type { IHomeworkData, IHomeworkDataWPopulate, IHomeworksState, IRootState } from 'types';

export default connect(mapStateToProps)(LessonWorks);

const cx = classNames.bind(classes);
const t = formatI18nT('courseLesson.works');

interface IConnectedProps {
  homeworksState: IHomeworksState
  authedUserId?: string
}

function mapStateToProps(state: IRootState): IConnectedProps {
  return {
    homeworksState: state.homeworks,
    authedUserId: state.user?.user?.id,
  };
}

interface IProps extends IConnectedProps {
  selectedUser: { id: string, displayName: string } | null
  setSelectedUser: (u: { id: string, displayName: string } | null) => void
  homework?: IHomeworkDataWPopulate
}

function LessonWorks({ selectedUser, setSelectedUser, homework, homeworksState, authedUserId }: IProps) {
  const { courseId, lessonId } = useParams();

  useFetch<IFetchHomeworksPayload>({
    actionCreator: fetchHomeworks,
    payload: {
      filter: {
        id: dataService.homework.getFullId(courseId!, lessonId!, authedUserId ?? ''),
        courseId: courseId!,
        lessonId: lessonId!,
      },
      populate: {
        user: true,
      },
    },
  });

  const selectedHomework = useMemo(() => {
    return homeworksState.homeworks?.find(data => data.homework.userId === selectedUser?.id);
  }, [homeworksState.homeworks, selectedUser]);

  
  if (!homeworksState.homeworks) {
    return <>Loading...</>
  }

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
              {renderWorkCards({ setSelectedUser, homeworks: homeworksState.homeworks })}
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
  homework: IHomeworkDataWPopulate
}

function renderWorkCard({ setSelectedUser, homework }: IRenderWorkCardProps) {
  return (
    <div className={classes.work}><WorkCard homework={homework} handleClick={setSelectedUser}/></div>
  );
}

interface IRenderWorkCardsProps {
  setSelectedUser: (u: { id: string, displayName: string } | null) => void
  homeworks: IHomeworkDataWPopulate[]
}

function renderWorkCards({ setSelectedUser, homeworks }: IRenderWorkCardsProps) {
  return homeworks.map((homework, index) => (<Fragment key={index}>{renderWorkCard({ setSelectedUser, homework })}</Fragment>));
}

function getHomeworks() {
  return allHomeworks;
}

const allHomeworks: IHomeworkData[] = [];

// const allHomeworks: IHomeworkData[] = [
//   {
//     id: '2_some-user-id',
//     user: {
//       id: 'sonia',
//       displayName: 'Sofiia ulianova',
//     },
//     text: 'Это мое описание первого задания на курса. Это мое описание первого задания на курса. Это мое описание первого задания на курса. Это мое описание первого задания на курса. Это мое описание первого задания на курса.',
//     reference: {
//       tag: 'a',
//       content: 'Это мое описание первого задания на курса.',
//     },
//     images: [
//       {
//         src: 'TheStrangerVisitingNatureSusl',
//         alt: 'TheStrangerVisitingNatureSusl',
//       },
//       {
//         src: 'TheStrangerVisitingNatureSusl',
//         alt: 'TheStrangerVisitingNatureSusl',
//       },
//       {
//         src: 'TheStrangerVisitingNatureSusl',
//         alt: 'TheStrangerVisitingNatureSusl',
//       },
//       {
//         src: 'SummerTime',
//         alt: 'SummerTime',
//       },
//       {
//         src: 'TheStrangerVisitingNatureSusl',
//         alt: 'TheStrangerVisitingNatureSusl',
//       },
//       {
//         src: 'TheStrangerVisitingNatureSusl',
//         alt: 'TheStrangerVisitingNatureSusl',
//       },
//       {
//         src: 'SummerTime',
//         alt: 'SummerTime',
//       },
//       {
//         src: 'SummerTime',
//         alt: 'SummerTime',
//       },
//       {
//         src: 'SummerTime',
//         alt: 'SummerTime',
//       },
//     ],
//     review: [
//       { type: 'text', text: [
//         {
//           tag: 'p',
//           content: [
//             {
//               tag: 'span',
//               props: { className: 'textSmall' },
//               content: 'Обратная связь по первому заданию. ',
//             },
//             {
//               tag: 'span',
//               content: 'Это мое описание первого задания на курса. Это мое описание первого задания на курса. Это мое описание первого задания на курса. Это мое описание первого задания на курса.',
//             },
//           ],
//         },
//       ]},
//       { type: 'gallery', images: [
//         {
//           src: 'TheStrangerVisitingNatureSusl',
//           alt: 'TheStrangerVisitingNatureSusl',
//         },
//         {
//           src: 'SummerTime',
//           alt: 'SummerTime',
//         },
//       ] },
//     ],
//   },
//   {
//     id: '2_some-user-id',
//     user: {
//       id: 'vova',
//       displayName: 'Vladimir',
//     },
//     text: 'Это мое описание первого задания на курса. Это мое описание первого задания на курса. Это мое описание первого задания на курса. Это мое описание первого задания на курса. Это мое описание первого задания на курса.',
//     reference: {
//       tag: 'a',
//       content: 'Это мое описание первого задания на курса.',
//     },
//     images: [
//       {
//         src: 'TheStrangerVisitingNatureSusl',
//         alt: 'TheStrangerVisitingNatureSusl',
//       },
//       {
//         src: 'TheStrangerVisitingNatureSusl',
//         alt: 'TheStrangerVisitingNatureSusl',
//       },
//       {
//         src: 'TheStrangerVisitingNatureSusl',
//         alt: 'TheStrangerVisitingNatureSusl',
//       },
//       {
//         src: 'SummerTime',
//         alt: 'SummerTime',
//       },
//       {
//         src: 'TheStrangerVisitingNatureSusl',
//         alt: 'TheStrangerVisitingNatureSusl',
//       },
//       {
//         src: 'TheStrangerVisitingNatureSusl',
//         alt: 'TheStrangerVisitingNatureSusl',
//       },
//       {
//         src: 'SummerTime',
//         alt: 'SummerTime',
//       },
//       {
//         src: 'SummerTime',
//         alt: 'SummerTime',
//       },
//       {
//         src: 'SummerTime',
//         alt: 'SummerTime',
//       },
//     ],
//   },
// ];