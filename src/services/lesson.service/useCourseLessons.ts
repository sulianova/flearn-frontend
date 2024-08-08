import { useBehaviourSubjectValue } from 'hooks';

import type LessonService from '.';

export default function useCourseLessons(this: LessonService) {
  return useBehaviourSubjectValue(this._courseLessonsBS).lessons;
}
