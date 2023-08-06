import { useSelector } from 'react-redux';

import { envService} from 'services';
import Store from 'store';
import { downloadCourse, fetchCourse, uploadCourse } from 'store/actions/sagas';

import classes from './EditBar.module.scss';
import { ICourseState, ILessonsState, IRootState } from 'types';
import { useParams } from 'react-router';

interface IProps {
  variant: 'Course' | 'Lessons' | 'Lesson'
}

export default function EditBar({ variant }: IProps) {
  const courseState = useSelector<IRootState, ICourseState | undefined>(state => state.course);
  const lessonsState = useSelector<IRootState, ILessonsState | undefined>(state => state.lessons);
  const lessonState = undefined;

  const { courseId, lessonId } = useParams();

  if (
    envService.dataMode !== 'EDIT'
    || (variant === 'Course' && (!courseState || !courseId ))
    || (variant === 'Lessons' && (!lessonsState || !courseId ))
    || (variant === 'Lesson' && (!lessonState || !courseId || !lessonId))
  ) {
    return null;
  }

  if (!courseState) {
    return null;
  }

  const { source } = courseState;

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
      // save lessons
      // tslint:disable-next-line
      console.log(`saving lesson ${props.lessonId} for course: ${props.courseId}`);
      break;
    default:
      // @ts-ignore
      const n: never = props.variant;
  }
}

function handleDownload(props: TProps) {
  switch (props.variant) {
    case 'Course':
      console.log('handleDownload');
      Store.dispatch(downloadCourse({ payload: { courseId: props.courseId } }));
      break;
    case 'Lessons':
      // save lessons
      // tslint:disable-next-line
      console.log('saving lessons for course: ', props.courseId);
      break;
    case 'Lesson':
      // save lessons
      // tslint:disable-next-line
      console.log(`saving lesson ${props.lessonId} for course: ${props.courseId}`);
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
        // save lessons
        // tslint:disable-next-line
        console.log(`saving lesson ${props.lessonId} for course: ${props.courseId}`);
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
        // save lessons
        // tslint:disable-next-line
        console.log(`switch lesson (${props.lessonId}) source to remote for course: ${props.courseId}`);
        break;
      default:
        // @ts-ignore
        const n: never = props.variant;
    }
  }
}
