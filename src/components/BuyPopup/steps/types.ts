import type { ICourseData } from 'services/course.service';
import type { IUserData } from 'services/user.service';

export interface IProps {
  course: ICourseData
  user: IUserData
  next: () => void
}
