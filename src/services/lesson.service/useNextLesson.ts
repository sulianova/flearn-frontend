import { useBehaviourSubjectValue } from 'hooks';

import type LessonService from '.';

export default function useNextLesson(this: LessonService) {
  return useBehaviourSubjectValue(this._nextLessonBS);
}
