import { useBehaviourSubjectValue } from 'hooks';

import type CourseService from '.';

export default function useCurrentCourse(this: CourseService) {
  return useBehaviourSubjectValue(this._currentCourseBS);
}
