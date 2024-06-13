import { Fragment, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

import { homeworkService } from 'services/homework.service';
import type { ILessonContent, ILessonData } from 'services/lesson.service/types';
import { IUserData } from 'services/user.service';
import { lessonService } from 'services/lesson.service';
import { userCourseProgressService } from 'services/userCourseProgress.service';
import { formatI18nT } from 'shared';
import { URLSections } from 'router';
import type { IHomeworkDataWPopulate } from 'types';

import Edit from 'assets/images/Svg/Edit';
import BuyPopup from 'components/BuyPopup/BuyPopup';
import Article from 'ui/Article/Article';
import Link from 'ui/Link/Link';

import TheoryFooter from '../TheoryFooter/TheoryFooter';
import classes from './LessonContent.module.scss';

export default LessonContent;

const t = formatI18nT('courseLesson');

interface IProps {
  courseId: string
  lessonId: string
  blocks: ILessonContent
  data: ILessonData
  homework?: IHomeworkDataWPopulate
  scrollToUpload: () => void
  canShowResults: boolean
  user: IUserData | null
}

function LessonContent(props: IProps) {
  const { courseId, user } = props;
  const navigate = useNavigate();
  const [nextLesson, setNextLesson] = useState<ILessonData | null | undefined>(undefined);
  const [buyPopupIsOpened, setBuyPopupIsOpened] = useState(false);

  useEffect(() => {
    lessonService
      .fetchNextLesson(props.data)
      .then(l => setNextLesson(l));
  }, [props.data]);

  return (
    <>
      {buyPopupIsOpened && <BuyPopup close={() => setBuyPopupIsOpened(false)}/>}
      <div className={classes._}>
        {/* {props.data.type === 'Practice' &&
          <Uppload
            courseId={props.courseId}
            lessonId={props.lessonId}
            homework={props.homework}
            scrollToUpload={props.scrollToUpload}
            canShowResults={props.canShowResults}
          />} */}
        <h1 className={classes.title}>lesson.title</h1>
        <Article blocks={props.blocks}/>
        <TheoryFooter
          onNext={() => {
            if (!user || nextLesson === undefined) {
              return;
            }
            userCourseProgressService
              .markLessonAsRead(props.courseId, user.email, props.data.id)
              .then(() => {
                if (nextLesson === null) {
                  //course has ended
                  navigate(URLSections.Course.Lessons.to({ courseId }));
                } else if (!nextLesson!.isFree) {
                  // next lesson is not free
                  // TODO show pay screen
                  setBuyPopupIsOpened(true);
                } else {
                  navigate(URLSections.Course.Lesson.to({ courseId, lessonId: nextLesson!.id }));
                }
              });
          }}
        />
      </div>
    </>
  );
}

// interface IUpploadProps {
//   courseId: string
//   lessonId: string
//   homework?: IHomeworkDataWPopulate
//   scrollToUpload: () => void
//   canShowResults: boolean
// }

// function Uppload(props: IUpploadProps) {
//   const { courseId, lessonId, homework } = props;
//   return (
//     <Fragment>
//       {homework && homework.homework.state !== 'DRAFT' && (!props.canShowResults || homework.populate?.user?.role === 'support') && (
//         <div className={classes.myWorkLinkWrapper}>
//           <h3 className={classes.myWorkLinkTitle}>{t('myWorkLinkTitle')}</h3>
//           <div className={classes.myWorkLinkGroup}>
//             <Link
//               className={classes.myWorkLink}
//               to={URLSections.Course.Lesson.MyWork.to({ courseId, lessonId })}
//             >
//               {homework.populate?.user?.displayName}
//             </Link>
//             {(
//               <button
//                 className={classes.edit}
//                 onClick={() =>
//                   homeworkService.patchHomework(homework.homework.id, { state: 'DRAFT' })
//                     .then(() => props.scrollToUpload())
//                 }
//               >
//                 <div className={classes.editImg}>
//                   <Edit/>
//                 </div>
//               </button>
//             )}
//           </div>
//         </div>
//       )}
//     </Fragment>
//   );
// }
