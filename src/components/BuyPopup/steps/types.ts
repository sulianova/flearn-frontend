import { ICourseData } from 'services/course.service';

export interface IProps {
  course: ICourseData
  next: () => void
}
