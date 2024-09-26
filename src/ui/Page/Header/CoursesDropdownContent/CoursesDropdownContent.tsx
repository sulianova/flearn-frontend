import { type ICourseData } from 'services/course.service';
import { URLSections } from 'router';
import Link from 'ui/Link/Link';

import Spinner from 'ui/Spinner/Spinner';
import classes from './CoursesDropdownContent.module.scss';
import classnames from 'classnames/bind';
import { useParams } from 'react-router';
import { useURLSection } from 'hooks';

const cx = classnames.bind(classes);

interface IProps {
  courses: ICourseData[]
  lastStudiedCourse: ICourseData | null
  close: () => void
}

export default function CoursesDropdownContent({ courses, lastStudiedCourse, close }: Readonly<IProps>) {
  const urlSection = useURLSection();
  const { courseId } = useParams();
  return (
    <div className={classes.selectMenu} onClick={close}>
      <div className={classes.scrollableDefault}>
        <div className={classes.contentWrapper}>
          <div className={classes.contentContainer}>
            <div className={classes.content}>
              <div className={classes.listItems}>
                {/* <div className={classes.listOptionTitle}>Бесплатная часть</div> */}
                {
                  courses.map(course => (
                    <Link
                      key={course.id}
                      to={URLSections.Course.to({ courseId: course.id })}
                      className={cx({
                        listOption: true,
                        active: {
                          'Home': course.id === lastStudiedCourse?.id,
                          'Landing': course.id === lastStudiedCourse?.id,
                          'Courses': course.id === lastStudiedCourse?.id,
                          'Course': course.id === courseId,
                          'Profile': course.id === lastStudiedCourse?.id,
                          'EmptyProfile': course.id === courseId,
                          'Study': course.id === courseId,
                          'Other': course.id === courseId,
                        }[urlSection.name]
                      })}
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
