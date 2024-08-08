import { useBehaviourSubjectValue } from 'hooks';

import type UserAccessService from '.';

export default function useCurrentCourseAccess(this: UserAccessService) {
  return useBehaviourSubjectValue(this._currentCourseAccessBS);
}
