// import { Fragment, useEffect, useMemo, useState } from 'react';
// import { useParams } from 'react-router';
// import type { Subscription } from 'rxjs';

// import { IHomeworkDataWPopulate } from 'services/homework.service';
// import { formatI18nT } from 'shared';

// import EditBar from 'ui/EditBar/EditBar';

// import LessonUppload from '../LessonUppload/LessonUppload';
// import WorkCard from './WorkCard/WorkCard';

// import classes from './LessonWorks.module.scss';

// import { ECommonErrorTypes } from 'types';

// export default LessonWorks;

// const t = formatI18nT('courseLesson.works');

// function LessonWorks() {
//   return null;
//   // const { courseId, lessonId } = useParams() as { courseId: string, lessonId: string };
//   // const { filter, patchFilter } = useFilter();
//   // const authedUser = userService.useAuthedUser();
//   // const authedUserId = authedUser?.id;

//   // const [source, setSource] = useState<'remote' | 'local'>('remote');

//   // const [homeworks, setHomeworks] = useState<IHomeworkDataWPopulate[] | undefined>(undefined);
//   // const [homeworksState, setHomeworksState] = useState<THomeworkStateState>({ type: 'idle' });
//   // const authedUserHomework = useMemo(() => homeworks?.find(h => h.homework.userId === authedUserId), [authedUserId, homeworks]);
//   // const otherStudentsHomeworks = useMemo(() => homeworks?.filter(h => h.homework.userId !== authedUserId), [authedUserId, homeworks]);
//   // const { homework, homeworkState } = useFetchHomework({ courseId, lessonId, userId: authedUserId });

//   // const filteredOtherStudentsHomeworks = useMemo(() => {
//   //   if (!otherStudentsHomeworks) {
//   //     return otherStudentsHomeworks;
//   //   }

//   //   let filteredHomeworks = otherStudentsHomeworks;

//   //   if (authedUser?.role === 'support') {
//   //     filteredHomeworks = filteredHomeworks.filter(h => h.homework.state === (filter.homeworkState ?? 'REVIEWED'));
//   //   } else {
//   //     filteredHomeworks = filteredHomeworks.filter(h => h.homework.state === 'REVIEWED');
//   //   }

//   //   if (filter.limit !== null) {
//   //     filteredHomeworks = filteredHomeworks.slice(0, filter.limit);
//   //   }

//   //   return filteredHomeworks;
//   // }, [otherStudentsHomeworks, filter, authedUser]);

//   // useEffect(() => {
//   //   if (!courseId || !lessonId) {
//   //     return;
//   //   }

//   //   setHomeworksState({ type: 'pending' });
//   //   let subscription = homeworkService.getHomeworkBS({
//   //     filter: { courseId, lessonId },
//   //     populate: { user: true },
//   //     reviewSource: source,
//   //   }).subscribe(e => {
//   //       if (e && !(e instanceof Error)) {
//   //         setHomeworks(e.homeworks);
//   //         setHomeworksState({ type: 'idle' });
//   //       }

//   //       if (e instanceof Error) {
//   //         setHomeworksState({ type: 'error', error: e, errorType: ECommonErrorTypes.Other });
//   //       }
//   //     });

//   //   return () => subscription?.unsubscribe();
//   // }, [courseId, lessonId, source]);

//   // const selectedHomework = useMemo(() => {
//   //   return homeworks?.find(data => data.homework.userId === filter.userId);
//   // }, [homeworks, filter]);

//   // if (!otherStudentsHomeworks) {
//   //   return <>Loading...</>
//   // }

//   // if (selectedHomework) {
//   //   return (
//   //   <Fragment>
//   //     {authedUser?.role === 'support' && (
//   //       <>
//   //         <button
//   //           className={classes.backBtn + ' inline-link'}
//   //           onClick={() => homeworkService.patchHomework(selectedHomework.homework.id, { state: 'REVIEWED' })}
//   //         >
//   //           MAKE REVIEWED
//   //         </button>
//   //         <button
//   //           className={classes.backBtn + ' inline-link'}
//   //           onClick={() => homeworkService.patchHomework(selectedHomework.homework.id, { state: 'SENT_FOR_REVIEW' })}
//   //         >
//   //           MAKE SENT_FOR_REVIEW
//   //         </button>
//   //       </>
//   //     )}
//   //     {authedUser?.role === 'support' && (
//   //       <EditBar
//   //         source={source}
//   //         handleSourceChange={setSource}
//   //         handleUpload={() => homeworkService.patchHomework(selectedHomework.homework.id, { review: selectedHomework.homework.review })}
//   //       />
//   //     )}
//   //   </Fragment>);
//   // }

//   // let showMore: React.ReactNode;
//   // const homeworksAreExpandable = otherStudentsHomeworks && otherStudentsHomeworks.length > 4 && filteredOtherStudentsHomeworks!.length <= 4;
//   // if (homeworksAreExpandable) {
//   //   showMore = (
//   //     <div className={classes.showMoreLess}>
//   //       <button
//   //         className={classes.showMoreLessBtn + ' inline-link'}
//   //         onClick={() => patchFilter({ limit: null })}
//   //       >
//   //         <span className='inline-link-text'>{t('showMoreBtn')}</span>
//   //         <span className='inline-link-arrow'>↓</span>
//   //       </button>
//   //     </div>
//   //   );
//   // }

//   // let showLess: React.ReactNode;
//   // const homeworksAreExpanded = otherStudentsHomeworks && otherStudentsHomeworks.length > 4 && filteredOtherStudentsHomeworks!.length > 4;
//   // if (homeworksAreExpanded) {
//   //   showLess = (
//   //     <div className={classes.showMoreLess}>
//   //       <button
//   //         className={classes.showMoreLessBtn + ' s-text-21-uppercase inline-link'}
//   //         onClick={() => patchFilter({ limit: 4 })}
//   //       >
//   //         <span className='inline-link-text'>{t('showLessBtn')}</span>
//   //         <span className='inline-link-arrow'>↑</span>
//   //       </button>
//   //     </div>
//   //   );
//   // }

//   // const noWorks = !otherStudentsHomeworks.length;
//   // return (
//   //   <div className={classes._}>
//   //     {/* {authedUser?.role === 'support' && (
//   //       <>
//   //         <button
//   //           className={classes.backBtn + 'inline-link'}
//   //           onClick={() => patchFilter({ homeworkState: 'SENT_FOR_REVIEW' })}
//   //         >
//   //           SENT_FOR_REVIEW
//   //         </button>
//   //         <button
//   //           className={classes.backBtn + 'inline-link'}
//   //           onClick={() => patchFilter({ homeworkState: 'REVIEWED' })}
//   //         >
//   //           REVIEWED
//   //         </button>
//   //       </>
//   //     )} */}
//   //     {/* <div className={classes.wrapper}>
//   //         <LessonUppload
//   //           homeworkWPopulate={homework}
//   //         />
//   //     </div> */}
//   //     {renderWorkCards(filteredOtherStudentsHomeworks!)}
//   //     {showMore}
//   //     {showLess}
//   //   </div>
//   // );
// }

// function renderWorkCards(homeworks: IHomeworkDataWPopulate[]) {
//   return homeworks.map(homework => (
//     <div
//       key={homework.homework.id}
//       className={classes.work}
//     >
//       <WorkCard homework={homework}/>
//     </div>
//   ));
// }

export default () => null;