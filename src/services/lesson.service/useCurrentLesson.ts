import { useBehaviourSubjectValue } from 'hooks';

import type LessonService from '.';

export default function useCurrentLesson(this: LessonService) {
  return useBehaviourSubjectValue(this._currentLessonBS);
}
