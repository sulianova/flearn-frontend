import { useBehaviourSubjectValue } from 'hooks';

import type UserCourseProgressService from '.';

export default function useCurrentCourseProgress(this: UserCourseProgressService) {
  return useBehaviourSubjectValue(this._currentCourseProgressBS)?.value ?? null;
}
