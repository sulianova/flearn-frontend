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

import useFilter from '../useFilter';

import classes from './LessonWorks.module.scss';

import type { IHomeworkDataWPopulate, IRootState, THomeworkStateState } from 'types';

export default connect(mapStateToProps)(LessonWorks);

const cx = classNames.bind(classes);
const t = formatI18nT('courseLesson.works');

interface IProps {
  authedUserId?: string
}

function mapStateToProps(state: IRootState): IProps {
  return {
    authedUserId: state.user?.user?.id,
  };
}

function LessonWorks({ authedUserId }: IProps) {
  const { courseId, lessonId } = useParams() as { courseId: string, lessonId: string };
  const { filter, patchFilter } = useFilter();

  const [homeworks, setHomeworks] = useState<IHomeworkDataWPopulate[] | undefined>(undefined);
  const [homeworksState, setHomeworksState] = useState<THomeworkStateState>({ type: 'idle' });
  const authedUserHomework = useMemo(() => homeworks?.find(h => h.homework.userId === authedUserId), [authedUserId, homeworks]);
  const otherStudentsHomeworks = useMemo(() => homeworks?.filter(h => h.homework.userId !== authedUserId), [authedUserId, homeworks]);

  const filteredOtherStudentsHomeworks = useMemo(() => {
    if (!otherStudentsHomeworks) {
      return otherStudentsHomeworks;
    }

    if (filter.limit !== null) {
      return otherStudentsHomeworks.slice(0, filter.limit);
    }

    return otherStudentsHomeworks;
  }, [otherStudentsHomeworks, filter]);

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
    return homeworks?.find(data => data.homework.userId === filter.userId);
  }, [homeworks, filter]);

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

  let showMore: React.ReactNode;
  const homeworksAreExpandable = otherStudentsHomeworks && otherStudentsHomeworks.length > 4 && filteredOtherStudentsHomeworks!.length <= 4;
  if (homeworksAreExpandable) {
    showMore = (
      <div className={classes.showMoreLess}>
        <button
          className={classes.showMoreLessBtn + ' s-text-21-uppercase inline-link'}
          onClick={() => patchFilter({ limit: null })}
        >
          <span className='inline-link-text'>{t('showMoreBtn')}</span>
          <span className='inline-link-arrow'>↓</span>
        </button>
      </div>
    );
  }

  let showLess: React.ReactNode;
  const homeworksAreExpanded = otherStudentsHomeworks && otherStudentsHomeworks.length > 4 && filteredOtherStudentsHomeworks!.length > 4;
  if (homeworksAreExpanded) {
    showLess = (
      <div className={classes.showMoreLess}>
        <button
          className={classes.showMoreLessBtn + ' s-text-21-uppercase inline-link'}
          onClick={() => patchFilter({ limit: 4 })}
        >
          <span className='inline-link-text'>{t('showLessBtn')}</span>
          <span className='inline-link-arrow'>↑</span>
        </button>
      </div>
    );
  }

  return (
    <div className={classes._}>
      <div className={classes.wrapper}>
        <div className={classes.own}>
          <div className={classes.ownTitle + ' s-text-36'}>{t('ownTitle')}</div>
            <div className={cx({ ownWork: true, ownWorkEmpty: !authedUserHomework })}>
              {authedUserHomework ?
                (<WorkCard homework={authedUserHomework}/>)
                : (<div className='s-text-14'>{t('subTitle')}</div>)
              }
            </div>
        </div>
          <div className={classes.list}>
            <div className={classes.listTitle + ' s-text-36'}>{t('listTitle')}</div>
            <div className={classes.listInner}>
              {renderWorkCards(filteredOtherStudentsHomeworks!)}
            </div>
            {showMore}
            {showLess}
          </div>
      </div>
    </div>
  );
}

function renderWorkCards(homeworks: IHomeworkDataWPopulate[]) {
  return homeworks.map(homework => (
    <div
      key={homework.homework.id}
      className={classes.work}
    >
      <WorkCard homework={homework}/>
    </div>
  ));
}
