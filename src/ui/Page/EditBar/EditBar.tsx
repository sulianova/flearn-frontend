import { useSelector } from 'react-redux';
import { useParams } from 'react-router';

import { useURLSection } from 'hooks';

import { envService} from 'services';
import Store from 'store';
import { downloadCourse, downloadLesson, fetchCourse, fetchLesson, uploadCourse, uploadLesson } from 'store/actions/sagas';

import { type ICourseState, type ILessonState, type IRootState } from 'types';

import classes from './EditBar.module.scss';

export default function EditBar() {
  const variant = useURLSection();
  const courseState = useSelector<IRootState, ICourseState | undefined>(state => state.course);
  // const lessonsState = useSelector<IRootState, ILessonsState | undefined>(state => state.lessons);
  const lessonState = useSelector<IRootState, ILessonState | undefined>(state => state.lesson);

  const { courseId, lessonId } = useParams();

  if (
    variant === 'Other'
    || envService.dataMode !== 'EDIT'
    || (variant === 'Course' && !courseId)
    || (variant === 'Lessons' && !courseId)
    || (variant === 'Lesson'  && (!courseId || !lessonId))
  ) {
    return null;
  }

  const source =
    variant === 'Course' ? courseState?.source ?? 'remote'
    : variant === 'Lesson' ? lessonState?.source ?? 'remote'
    : 'local';

  return (
    <section className={classes._}>
      <div className={classes.stickyBtnStaff}>
        <div className={classes.stickyBtnShaftInner}>
          <div
            className={classes.stickyBtn + ' s-text-24'}
            onClick={() => handleUpload({ variant, courseId: courseId!, lessonId: lessonId! })}
          >
            Upload
          </div>
          <div
            className={classes.stickyBtn + ' s-text-24'}
            onClick={() => handleDownload({ variant, courseId: courseId!, lessonId: lessonId! })}
          >
            Download
          </div>
          <div
            className={classes.stickyBtn + ' s-text-24'}
            onClick={() => handleSwitch({ variant, courseId: courseId!, lessonId: lessonId! }, source === 'local' ? 'remote' : 'local')}
          >
            {source === 'local' ? 'use remote' : 'use local'}
          </div>
        </div>
      </div>
    </section>
  );
}

type TProps =
  {
    variant: 'Course',
    courseId: string,
  }
  | {
    variant: 'Lessons',
    courseId: string,
  }
  | {
    variant: 'Lesson',
    courseId: string,
    lessonId: string,
  };

function handleUpload(props: TProps) {
  switch (props.variant) {
    case 'Course':
      Store.dispatch(uploadCourse({ payload: { courseId: props.courseId } }));
      break;
    case 'Lessons':
      // save lessons
      // tslint:disable-next-line
      console.log('saving lessons for course: ', props.courseId);
      break;
    case 'Lesson':
      Store.dispatch(uploadLesson({ payload: { courseId: props.courseId, lessonId: props.lessonId } }));
      break;
    default:
      // @ts-ignore
      const n: never = props.variant;
  }
}

function handleDownload(props: TProps) {
  switch (props.variant) {
    case 'Course':
      Store.dispatch(downloadCourse({ payload: { courseId: props.courseId } }));
      break;
    case 'Lessons':
      // save lessons
      // tslint:disable-next-line
      console.log('saving lessons for course: ', props.courseId);
      break;
    case 'Lesson':
      Store.dispatch(downloadLesson({ payload: { courseId: props.courseId, lessonId: props.lessonId } }));
      break;
    default:
      // @ts-ignore
      const n: never = props.variant;
  }
}

function handleSwitch(props: TProps, targetSource: 'local' | 'remote') {
  if (targetSource === 'local') {
    switch (props.variant) {
      case 'Course':
        Store.dispatch(fetchCourse({ payload: { courseId: props.courseId, source: 'local' } }));
        break;
      case 'Lessons':
        // save lessons
        // tslint:disable-next-line
        console.log('switch lessons source to local for course: ', props.courseId);
        break;
      case 'Lesson':
        Store.dispatch(fetchLesson({ payload: { courseId: props.courseId, lessonId: props.lessonId, source: 'local' } }));
        break;
      default:
        // @ts-ignore
        const n: never = props.variant;
    }
  } else {
    switch (props.variant) {
      case 'Course':
        Store.dispatch(fetchCourse({ payload: { courseId: props.courseId, source: 'remote' } }));
        break;
      case 'Lessons':
        // save lessons
        // tslint:disable-next-line
        console.log('switch lessons source to remote for course: ', props.courseId);
        break;
      case 'Lesson':
        Store.dispatch(fetchLesson({ payload: { courseId: props.courseId, lessonId: props.lessonId, source: 'remote' } }));
        break;
      default:
        // @ts-ignore
        const n: never = props.variant;
    }
  }
}
