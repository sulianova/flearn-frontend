import { firebaseService } from 'services/firebase.service';
import { type ILessonData } from 'services/lesson.service';
import { TSurveyAnswer, TSurveyStep, type TSurveyAnswers } from 'services/surveyAnswers.service';

type TAnswersWithQuestions = Record<number,
  {
    question: TSurveyStep
    answer: TSurveyAnswer<TSurveyStep>
  }
>

class SurveyAnswers {
  public async get(props: { lessonId: string, email: string }): Promise<TSurveyAnswers | undefined> {
    try {
      const answersWithQuestions = await firebaseService.getDoc<TAnswersWithQuestions>(firebaseService.Collections.SurveyAnswers, this.getId(props));
      if (!answersWithQuestions) {
        return undefined;
      }

      return Object.fromEntries(Object.entries(answersWithQuestions).map(([key, o]) => [key, o.answer]))
    } catch (error) {
      console.log('Failed to get survey answers', { props, error });
      throw error;
    }
  }

  public async set(props: { lesson: ILessonData, email: string, answers: TSurveyAnswers }) {
    try {
      const steps = Object.keys(props.lesson.survey!).map(s => +s);
      const answersWithQuestions = Object.fromEntries(steps.map(step => [step, {
        question: props.lesson.survey![step],
        answer: props.answers[step]
      }])) as TAnswersWithQuestions;
      await firebaseService.setDoc<TAnswersWithQuestions>(
        firebaseService.Collections.SurveyAnswers,
        this.getId({ lessonId: props.lesson.id, email: props.email }),
        answersWithQuestions
      );
    } catch (error) {
      console.log('Failed to get survey answers', { props, error });
      throw error;
    }
  }

  private getId(props: { lessonId: string, email: string }) {
    return `${props.lessonId}-${props.email}`;
  }
}

const surveyAnswers = new SurveyAnswers();
export default surveyAnswers;
