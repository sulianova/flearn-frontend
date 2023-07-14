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
      <div className={classes.titleCol}>
        <h1 className={classes.title + ' s-text-21'}>Как рисовать свободно</h1>
        <div className='s-text-21'>23 мая — 23 июня</div>
      </div>
      <div className={classes.lesson}>
        <div className={classes.lessonNumber + ' s-text-21'}>{props.lesson.type === 'Practice' ? 'Задание' : 'Урок'} 1</div>
        <div className={classes.lessonNav}>
          <Link
            className={classes.lessonNavLink + 'inline-link s-text-21-uppercase'} to={URLSections.Course.Lessons.to({ courseId })}
          >
            <span className='inline-link-text'>Все уроки</span>
            <span className='inline-link-arrow'>&rarr;</span>
          </Link>
          <Link
            className={classes.lessonNavLink + ' inline-link s-text-21-uppercase blue'} to={URLSections.Course.Lesson.to({ courseId, lessonId: String(nextLesson) })}
          >
            <span className='inline-link-text'>Следующий урок</span>
            <span className='inline-link-arrow'>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
