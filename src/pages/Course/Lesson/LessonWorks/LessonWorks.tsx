import classNames from 'classnames/bind';
import { Fragment, useEffect, useMemo, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router';
import type { Subscription } from 'rxjs';

import { homeworkService } from 'services';
import { formatI18nT } from 'shared';

import LessonReview from './LessonReview/LessonReview';
import LessonWork from './LessonWork/LessonWork';
import WorkCard from './WorkCard/WorkCard';

import useFilter from './useFilter';

import classes from './LessonWorks.module.scss';

import type { IHomeworkDataWPopulate, IRootState, THomeworkStateState } from 'types';

export default connect(mapStateToProps)(LessonWorks);

const cx = classNames.bind(classes);
const t = formatI18nT('courseLesson.works');

interface IConnectedProps {
  authedUserId?: string
}

function mapStateToProps(state: IRootState): IConnectedProps {
  return {
    authedUserId: state.user?.user?.id,
  };
}

interface IProps extends IConnectedProps {
  selectedUser: { id: string, displayName: string } | null
  setSelectedUser: (u: { id: string, displayName: string } | null) => void
}

function LessonWorks({ selectedUser, setSelectedUser, authedUserId }: IProps) {
  const { courseId, lessonId } = useParams() as { courseId: string, lessonId: string };
  const { filter, patchFilter } = useFilter();

  const [homeworks, setHomeworks] = useState<IHomeworkDataWPopulate[] | undefined>(undefined);
  const [homeworksState, setHomeworksState] = useState<THomeworkStateState>({ type: 'idle' });
  const authedUserHomework = useMemo(() => homeworks?.find(h => h.homework.userId === authedUserId), [authedUserId, homeworks]);
  const otherStudentsHomeworks = useMemo(() => homeworks?.filter(h => h.homework.userId !== authedUserId), [authedUserId, homeworks]);
  const otherStudentsHomeworksBig = otherStudentsHomeworks ? [...otherStudentsHomeworks, ...otherStudentsHomeworks, ...otherStudentsHomeworks]: undefined;
  const filteredOtherStudentsHomeworks = useMemo(() => {
    if (!otherStudentsHomeworksBig) {
      return otherStudentsHomeworksBig;
    }

    if (filter.limit !== null) {
      return otherStudentsHomeworksBig.slice(0, filter.limit);
    }

    return otherStudentsHomeworksBig;
  }, [otherStudentsHomeworksBig, filter]);

  useEffect(() => {
    if (!courseId || !lessonId) {
      return;
    }

    setHomeworksState({ type: 'pending' });
    let subscription: Subscription;
    homeworkService.getHomeworkBS({
      filter: { courseId, lessonId },
      populate: { user: true },
    }).then(bs => {
      subscription = bs.subscribe(e => {
        if (e && !(e instanceof Error)) {
          setHomeworks(e.homeworks);
          setHomeworksState({ type: 'idle' });
        }

        if (e instanceof Error) {
          const errorType = homeworkService.errorToType(e);
          setHomeworksState({ type: 'error', error: e, errorType });
        }
      });
    });

    return () => subscription?.unsubscribe();
  }, [courseId, lessonId]);

  const selectedHomework = useMemo(() => {
    return homeworks?.find(data => data.homework.userId === selectedUser?.id);
  }, [homeworks, selectedUser]);

  if (!otherStudentsHomeworks) {
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
            <a className={cx({ ownWork: true, ownWorkEmpty: !authedUserHomework })} href='homework-editor.html'>
              {authedUserHomework ?
                (<WorkCard homework={authedUserHomework} handleClick={setSelectedUser}/>)
                : (<div className='s-text-14'>{t('subTitle')}</div>)
              }
            </a>
        </div>
          <div className={classes.list}>
            <div className={classes.listTitle + ' s-text-36'}>{t('listTitle')}</div>
            <div className={classes.listInner}>
              {renderWorkCards({ setSelectedUser, homeworks: filteredOtherStudentsHomeworks! })}
            </div>
            <div className={classes.showMore}>
              <button
                className={classes.showMoreBtn + ' s-text-21-uppercase inline-link'}
                onClick={() => patchFilter({ limit: null })}
              >
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
