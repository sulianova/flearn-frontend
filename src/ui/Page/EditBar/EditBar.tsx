import { useContext } from 'react';
import { useParams } from 'react-router';

import { useURLSection } from 'hooks';
import { envService } from 'services/env.service';
import { lessonService } from 'services/lesson.service';

import { PageSourceContext } from '../Page';

import classes from './EditBar.module.scss';

export default function EditBar() {
  const { courseId, lessonId } = useParams();
  const variant = useURLSection();
  const pageSourceContext = useContext(PageSourceContext);

  if (
    variant === 'Other'
    || variant === 'Lessons'
    || envService.dataMode !== 'EDIT'
    || (variant === 'Course' && !courseId)
    || (variant === 'Lesson' && (!courseId || !lessonId))
  ) {
    return null;
  }

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
            onClick={() => pageSourceContext.setSource(pageSourceContext.source === 'local' ? 'remote' : 'local')}
          >
            {pageSourceContext.source === 'local' ? 'use remote' : 'use local'}
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
      lessonService.upload(props);
      break;
    default:
      // @ts-ignore
      const n: never = props.variant;
  }
}
