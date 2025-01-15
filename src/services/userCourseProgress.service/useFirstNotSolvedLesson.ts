import { useBehaviourSubjectValue } from 'hooks';

import type UserCourseProgressService from '.';

export default function useFirstNotSolvedLesson(this: UserCourseProgressService) {
  return useBehaviourSubjectValue(this._firstNotSolvedLessonBS);
}
