import { useBehaviourSubjectValue } from 'hooks';

import type CourseService from '.';

export default function useUserCourses(this: CourseService) {
  return useBehaviourSubjectValue(this._userCoursesBS);
}
