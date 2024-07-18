import { useBehaviourSubjectValue } from 'hooks';

import type UserCourseProgressService from '.';

export default function useLastStudiedCourse(this: UserCourseProgressService) {
  return useBehaviourSubjectValue(this._lastStudiedCourseBS);
}
