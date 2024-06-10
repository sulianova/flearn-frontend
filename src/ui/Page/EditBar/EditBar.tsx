import { useParams } from 'react-router';

import { useBehaviourSubjectValue, useURLSection } from 'hooks';
import { envService } from 'services/env.service';
import { lessonService } from 'services/lesson.service';

import classes from './EditBar.module.scss';

export default function EditBar() {
  const { courseId, lessonId } = useParams();
  const variant = useURLSection();
  const lessonSource = useBehaviourSubjectValue(lessonService.sourceBS);

  if (
    variant === 'Other'
    || variant === 'Lessons'
    || envService.dataMode !== 'EDIT'
    || (variant === 'Course' && !courseId)
    || (variant === 'Lesson' && (!courseId || !lessonId))
  ) {
    return null;
  }

  const [source, setSource] = ({
    'Lesson': [lessonSource, lessonService.changeSource.bind(lessonService)],
    'Course': ['remote', (newSource: 'remote' | 'local') => {}],
  } as const)[variant];

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
            onClick={() => setSource(source === 'local' ? 'remote' : 'local')}
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
      console.log('TODO: upload course');
      break;
    case 'Lesson':
      lessonService.upload(props.lessonId);
      break;
    default:
      // @ts-ignore
      const n: never = props.variant;
  }
}
