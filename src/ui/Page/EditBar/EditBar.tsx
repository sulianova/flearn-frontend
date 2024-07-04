import { useParams } from 'react-router';

import { useBehaviourSubjectValue, useURLSection } from 'hooks';
import { courseService } from 'services/course.service';
import { envService } from 'services/env.service';
import { lessonService } from 'services/lesson.service';

import classes from './EditBar.module.scss';

export default function EditBar() {
  const { courseId, lessonId } = useParams();
  const urlSection = useURLSection();
  const courseSource = useBehaviourSubjectValue(courseService.sourceBS);
  const lessonSource = useBehaviourSubjectValue(lessonService.sourceBS);

  if (
    urlSection.name === 'Other'
    || urlSection.name === 'Home'
    || urlSection.name === 'Profile'
    || urlSection.name === 'EmptyProfile'
    || envService.dataMode !== 'EDIT'
    || (urlSection.name === 'Course' && !courseId)
    || (urlSection.name === 'Study' && (!courseId || !lessonId))
  ) {
    return null;
  }

  const [source, toggleSource, upload] = ({
    'Course': [
      courseSource,
      () => courseService.changeSource(courseSource === 'local' ? 'remote' : 'local'),
      courseId ? () => courseService.upload(courseId) : undefined,
    ],
    'Study': [
      lessonSource,
      () => lessonService.changeSource(lessonSource === 'local' ? 'remote' : 'local'),
      lessonId ? () => lessonService.upload(lessonId) : undefined,
    ],
  } as const)[urlSection.name];

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
