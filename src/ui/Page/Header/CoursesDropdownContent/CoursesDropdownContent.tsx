import { type ICourseData } from 'services/course.service';
import { URLSections } from 'types';
import Link from 'ui/Link/Link';

import Spinner from 'ui/Spinner/Spinner';
import classes from './CoursesDropdownContent.module.scss';

interface IProps {
  courses: ICourseData[] | undefined
  close: () => void
}

export default function CoursesDropdownContent({ courses, close }: Readonly<IProps>) {
  return (
    <div className={classes.selectMenu} onClick={close}>
      <div className={classes.scrollableDefault}>
        <div className={classes.contentWrapper}>
          <div className={classes.contentContainer}>
            <div className={classes.content}>
              <div className={classes.listItems}>
                <div className={classes.listOptionTitle + ' s-text-14'}>
                  Проходите бесплатную часть
                </div>
                {
                  !courses ? <Spinner variant='local'/>
                  : !courses.length ? <div>У вас пока нет курсов, давайте выберем</div>
                  : courses.map(course => (
                    <Link
                      to={URLSections.Course.Lessons.to({ courseId: course.id })}
                      className={classes.listOption + ' s-text-16'}
                    >
                      {course.title}
                    </Link>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
