import { ILessonData, URLSections } from 'types';
import Link from 'ui/Link/Link';
import classes from './LessonHeader.module.scss';

import { useParams } from 'react-router';

export default LessonHeader;

interface IProps {
  lesson: ILessonData
  practice: 'task' | 'results'
  selectedUser: { id: string, displayName: string } | null
  handleDisselectUser: () => void
}

function LessonHeader(props: IProps) {
  const { courseId, lessonId } = useParams();
  const nextLesson = Number(lessonId) + 1;

  if (!courseId || !lessonId || Number.isNaN(nextLesson)) {
    return <>Error</>;
  }

  return (
    <div className={classes._}>
      <Link
        className={classes.nav + ' nav-link s-text-18'} to={URLSections.Course.Lessons.to({ courseId })}
      >
        <span className='nav-link-text'>Все уроки</span>
        <span className='nav-link-arrow'>&rarr;</span>
      </Link>
      <h1 className={classes.title + ' s-text-56'}>Тема первая</h1>
      {props.lesson.type === 'Practice' &&
        (<div className={classes.navTubs}>
          <Link
            className={classes.type + ' nav-link s-text-18' + (props.practice === 'task' ? ' isActive' : '')}
            to={URLSections.Course.Lesson.to({ courseId, lessonId })}
          >
            Задание
          </Link>
          <Link
            className={classes.type + ' nav-link s-text-18' + (props.practice === 'results' && !props.selectedUser ? ' isActive' : '')}
            to={URLSections.Course.Lesson.Results.to({ courseId, lessonId })}
            onClick={() => props.selectedUser && props.handleDisselectUser()}
          >
            Результаты
          </Link>
          {props.selectedUser &&
            (<span
              className={classes.type + ' nav-link s-text-18' + (props.practice === 'results' && props.selectedUser ? ' isActive' : '')}
            >
              {props.selectedUser.displayName}
            </span>)
          }
        </div>)
      }
    </div>
  );
}
