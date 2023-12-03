import { Fragment, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router';
import type { Subscription } from 'rxjs';

import { homeworkService } from 'services';
import { userService } from 'services/user.service';
import { formatI18nT } from 'shared';

import EditBar from 'ui/EditBar/EditBar';

import LessonReview from './LessonReview/LessonReview';
import LessonWork from './LessonWork/LessonWork';
import WorkCard from './WorkCard/WorkCard';
import NoOwnWorkPlaceholder from './WorkCard/NoOwnWorkPlaceholder';

import useFilter from '../useFilter';

import classes from './LessonWorks.module.scss';

import { type IHomeworkDataWPopulate, type THomeworkStateState } from 'types';

export default LessonWorks;

const t = formatI18nT('courseLesson.works');

function LessonWorks() {
  const { courseId, lessonId } = useParams() as { courseId: string, lessonId: string };
  const { filter, patchFilter } = useFilter();
  const authedUser = userService.useAuthedUser();
  const authedUserId = authedUser?.id;

  const [source, setSource] = useState<'remote' | 'local'>('remote');

  const [homeworks, setHomeworks] = useState<IHomeworkDataWPopulate[] | undefined>(undefined);
  const [homeworksState, setHomeworksState] = useState<THomeworkStateState>({ type: 'idle' });
  const authedUserHomework = useMemo(() => homeworks?.find(h => h.homework.userId === authedUserId), [authedUserId, homeworks]);
  const otherStudentsHomeworks = useMemo(() => homeworks?.filter(h => h.homework.userId !== authedUserId), [authedUserId, homeworks]);

  const filteredOtherStudentsHomeworks = useMemo(() => {
    if (!otherStudentsHomeworks) {
      return otherStudentsHomeworks;
    }

    let filteredHomeworks = otherStudentsHomeworks;

    if (authedUser?.role === 'support') {
      filteredHomeworks = filteredHomeworks.filter(h => h.homework.state === (filter.homeworkState ?? 'REVIEWED'));
    } else {
      filteredHomeworks = filteredHomeworks.filter(h => h.homework.state === 'REVIEWED');
    }

    if (filter.limit !== null) {
      filteredHomeworks = filteredHomeworks.slice(0, filter.limit);
    }

    return filteredHomeworks;
  }, [otherStudentsHomeworks, filter, authedUser]);

  useEffect(() => {
    if (!courseId || !lessonId) {
      return;
    }

    setHomeworksState({ type: 'pending' });
    let subscription: Subscription;
    homeworkService.getHomeworkBS({
      filter: { courseId, lessonId },
      populate: { user: true },
      reviewSource: source,
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
  }, [courseId, lessonId, source]);

  const selectedHomework = useMemo(() => {
    return homeworks?.find(data => data.homework.userId === filter.userId);
  }, [homeworks, filter]);

  if (!otherStudentsHomeworks) {
    return <>Loading...</>
  }

  if (selectedHomework) {
    return (
    <Fragment>
      <button
        className={classes.backBtn + ' s-text-21-uppercase inline-link'}
        onClick={() => homeworkService.patchHomework(selectedHomework.homework.id, { state: 'REVIEWED' })}
      >
        MAKE REVIEWED
      </button>
      <button
        className={classes.backBtn + ' s-text-21-uppercase inline-link'}
        onClick={() => homeworkService.patchHomework(selectedHomework.homework.id, { state: 'SENT_FOR_REVIEW' })}
      >
        MAKE SENT_FOR_REVIEW
      </button>
      <LessonWork homework={selectedHomework}/>
      <LessonReview homework={selectedHomework}/>
      <EditBar
        source={source}
        handleSourceChange={setSource}
        handleUpload={() => homeworkService.patchHomework(selectedHomework.homework.id, { review: selectedHomework.homework.review })}
      />
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

  const noWorks = !otherStudentsHomeworks.length;
  return (
    <div className={classes._}>
      <button
        className={classes.backBtn + ' s-text-21-uppercase inline-link'}
        onClick={() => patchFilter({ homeworkState: 'SENT_FOR_REVIEW' })}
      >
        SENT_FOR_REVIEW
      </button>
      <button
        className={classes.backBtn + ' s-text-21-uppercase inline-link'}
        onClick={() => patchFilter({ homeworkState: 'REVIEWED' })}
      >
        REVIEWED
      </button>
      <div className={classes.wrapper}>
        <div className={classes.own}>
          <div className={classes.ownTitle + ' s-text-36'}>{t('ownTitle')}</div>
            <div className={classes.ownWork}>{
              authedUserHomework
                ? <WorkCard homework={authedUserHomework}/>
                : <NoOwnWorkPlaceholder authedUser={authedUser}/>
            }</div>
        </div>
          <div className={classes.list}>
            <div className={classes.listTitle + ' s-text-36'}>
              {t(`listTitle:noWorks:${noWorks}`)}
            </div>
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
