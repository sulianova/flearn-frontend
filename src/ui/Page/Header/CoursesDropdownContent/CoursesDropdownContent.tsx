import { type ICourseData } from 'services/course.service';
import { URLSections } from 'router';
import Link from 'ui/Link/Link';

import Spinner from 'ui/Spinner/Spinner';
import classes from './CoursesDropdownContent.module.scss';
import classnames from 'classnames/bind';
import { useParams } from 'react-router';

const cx = classnames.bind(classes);

interface IProps {
  courses: ICourseData[] | undefined
  close: () => void
}

export default function CoursesDropdownContent({ courses, close }: Readonly<IProps>) {
  const { courseId } = useParams();
  return (
    <div className={classes.selectMenu} onClick={close}>
      <div className={classes.scrollableDefault}>
        <div className={classes.contentWrapper}>
          <div className={classes.contentContainer}>
            <div className={classes.content}>
              <div className={classes.listItems}>
                <div className={classes.listOptionTitle}>
                  Проходите бесплатную часть
                </div>
                {
                  !courses ? <Spinner variant='local'/>
                  : !courses.length ? <div>У вас пока нет курсов, давайте выберем</div>
                  : courses.map(course => (
                    <Link
                      key={course.id}
                      to={URLSections.Profile.to({ courseId: course.id })}
                      className={cx({ listOption: true, active: course.id === courseId })}
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
