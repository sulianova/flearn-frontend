import { useBehaviourSubjectValue } from 'hooks';

import type SurveyAnswersService from '.';

export default function useCurrentLessonSurveyAnswers(this: SurveyAnswersService) {
  return useBehaviourSubjectValue(this.currentLessonSurveyAnswersBS);
}
