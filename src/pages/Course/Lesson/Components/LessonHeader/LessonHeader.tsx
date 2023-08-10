import { ILessonData, URLSections } from 'types';
import Link from 'ui/Link/Link';
import classes from './LessonHeader.module.scss';

import { useParams } from 'react-router';

export default LessonHeader;

interface IProps {
  lesson: ILessonData
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
        className={classes.nav + ' link s-text-18'} to={URLSections.Course.Lessons.to({ courseId })}
      >
        <span className='inline-link-text'>Все уроки</span>
        <span className='inline-link-arrow'>&rarr;</span>
      </Link>
      <h1 className={classes.title + ' s-text-56'}>Тема первая</h1>
      <div className={classes.type + ' s-text-18'}>{props.lesson.type === 'Practice' ? 'Задание' : 'Лекция'}</div>
    </div>

  );
}
