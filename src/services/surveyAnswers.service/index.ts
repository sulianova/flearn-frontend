import { BehaviorSubject, merge, Subject } from 'rxjs';

import { locationService } from 'services/location.service';
import { userService } from 'services/user.service';
import { type ILessonData } from 'services/lesson.service';

import { TSurveyAnswers } from './types';
import useCurrentLessonSurveyAnswers from './useCurrentLessonSurveyAnswers'
import { dataService } from 'services';
import { v4 } from 'uuid';

export * from './types';

class SurveyAnswersService {
  public currentLessonSurveyAnswersBS = new BehaviorSubject<TSurveyAnswers | null>(null);
  public useCurrentLessonSurveyAnswers = useCurrentLessonSurveyAnswers;

  constructor() {
    this.initCurrentLessonSurveyAnswersBS();
  }

  public get currentLessonSurveyAnswers() {
    return this.currentLessonSurveyAnswersBS.getValue();
  }

  public async saveSurveyAnswers(props: { answers: TSurveyAnswers, lesson: ILessonData, userEmail?: string }) {
    try {
      await dataService.surveyAnswers.set({
        answers: props.answers,
        lesson: props.lesson,
        email: props.userEmail ?? `anonimus-${v4().slice(8)}`,
      });
      this._surveyAnswersS.next({ type: 'updated' });
    } catch (error) {
      console.log('Failed to save survey answer', { props, error });
      throw error;
    }
  }

  protected async fetchAnswers(props: { lessonId: string, userEmail: string }) {
    return [await dataService.surveyAnswers.get({ ...props, email: props.userEmail })]
  }

  protected initCurrentLessonSurveyAnswersBS() {
    const refetch = () => {
      const section = locationService.URLSection;
      const authedUser = userService.authedUser;
  
      if (section.name !== 'Study' || !authedUser) {
        this.currentLessonSurveyAnswersBS.next(null);
        return;
      }

      this.fetchAnswers({ lessonId: section.params.lessonId, userEmail: authedUser.email })
        .then(surveysAnswers => {
          const surveyAnswers = surveysAnswers.at(0);
          if (!surveyAnswers) {
            console.log('Failed to fetch current lesson survey answers', { surveyAnswers, section, authedUser });
            this.currentLessonSurveyAnswersBS.next(null);
            return;
          }

          this.currentLessonSurveyAnswersBS.next(surveyAnswers);
        })
        .catch(error => {
          console.log('Failed to fetch current lesson survey answers', { error, section, authedUser });
          this.currentLessonSurveyAnswersBS.next(null);
        })
    };

    merge(
      this._surveyAnswersS,
      locationService.URLSectionBS,
      userService.authedUserBS,
    ).subscribe(refetch);
  }

  protected _surveyAnswersS = new Subject<{ type: 'updated' }>();
}

export const surveyAnswersService = new SurveyAnswersService();
export default SurveyAnswersService;
