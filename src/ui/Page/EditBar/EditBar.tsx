import { useParams } from 'react-router';

import { useBehaviourSubjectValue, useURLSection } from 'hooks';
import { courseService } from 'services/course.service';
import { envService } from 'services/env.service';
import { lessonService } from 'services/lesson.service';

import classes from './EditBar.module.scss';

export default function EditBar() {
  const { courseId, lessonId } = useParams();
  const variant = useURLSection();
  const courseSource = useBehaviourSubjectValue(courseService.sourceBS);
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

  const [source, toggleSource, upload] = ({
    'Course': [
      courseSource,
      () => courseService.changeSource(courseSource === 'local' ? 'remote' : 'local'),
      courseId ? () => courseService.upload(courseId) : undefined,
    ],
    'Lesson': [
      lessonSource,
      () => lessonService.changeSource(lessonSource === 'local' ? 'remote' : 'local'),
      lessonId ? () => lessonService.upload(lessonId) : undefined,
    ],
  } as const)[variant];

  return (
    <section className={classes._}>
      <div className={classes.stickyBtnStaff}>
        <div className={classes.stickyBtnShaftInner}>
          <div className={classes.stickyBtn + ' s-text-24'} onClick={upload}>Upload</div>
          <div className={classes.stickyBtn + ' s-text-24'} onClick={toggleSource}>
            {source === 'local' ? 'use remote' : 'use local'}
          </div>
        </div>
      </div>
    </section>
  );
}
