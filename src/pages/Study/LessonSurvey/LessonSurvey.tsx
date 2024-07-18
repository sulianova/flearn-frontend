import classNames from 'classnames/bind';
import { ReactNode, useState } from 'react';

import {
  surveyAnswersService,
  type TSurvey,
  type TSurveyAnswer,
  type TSurveyAnswers,
  type ISurveyCardStep,
  type ISurveyCheckboxStep,
  type ISurveyRadioStep,
  type ISurveySelectStep,
  type ISurveyStep
} from 'services/surveyAnswers.service';
import { type IUserData } from 'services/user.service';
import { type ILessonData } from 'services/lesson.service';

import Icon from 'ui/Icon/Icon';

import classes from './LessonSurvey.module.scss';
import Spinner from 'ui/Spinner/Spinner';

const cx = classNames.bind(classes);

interface IContainerProps {
  lesson: ILessonData
  user: IUserData
  answers: TSurveyAnswers | null
}

export default function LessonSurveyContainer(props: IContainerProps) {
  if (!props.lesson.survey) {
    return null;
  }

  return (
    <LessonSurvey
      survey={props.lesson.survey!}
      lesson={props.lesson}
      user={props.user}
      answers={props.answers}
    />
  );
}

interface IProps<Survey extends TSurvey> {
  survey: Survey
  lesson: ILessonData
  user: IUserData
  answers: TSurveyAnswers | null
}

function LessonSurvey<Survey extends TSurvey>(props: IProps<Survey>) {
  const { survey, lesson, user, answers: fetchedAnswers } = props;

  const [answers, setAnswers] = useState<Partial<TSurveyAnswers<Survey>>>({});
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const step = survey[currentStepIndex];
  const answer = answers[currentStepIndex];

  const [isPending, setIsPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const stepsCount = Object.keys(survey).length;
  const hasNextStep = currentStepIndex < stepsCount - 1;
  const nextStep = !hasNextStep ? undefined
    : () => setCurrentStepIndex(currentStepIndex + 1);

  if (fetchedAnswers && !isSuccess) {
    return null;
  }

  if (fetchedAnswers && isSuccess) {
    return (
      <div className={classes.__}>
        <div className={classes.wrapper}>
          <div className={classes.content}>
            <div className={classes.successScreen}>
              <div className={classes.successScreenTitle}>Спасибо, мы записали ваш ответ!</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={classes.__}>
      <div className={classes.wrapper}>
        <div className={classes.content}>
          {step.type === 'SELECT' && step.variant === 'RADIO' && (
            <SelectRadioStep
              {...step}
              selectedValue={answer as TSurveyAnswer<typeof step>}
              onSelect={v => setAnswers({ ...answers, [currentStepIndex]: v })}
            />
          )}
          {step.type === 'SELECT' && step.variant === 'CHECKBOX' && (
            <SelectCheckboxStep
              {...step}
              selectedValue={answer as TSurveyAnswer<typeof step>}
              onSelect={v => setAnswers({ ...answers, [currentStepIndex]: v })}
            />
          )}
          {step.type === 'SELECT' && step.variant === 'CARD' && (
            <SelectCardStep
              {...step}
              selectedValue={answer as TSurveyAnswer<typeof step>}
              onSelect={v => setAnswers({ ...answers, [currentStepIndex]: v })}
            />
          )}
          {hasNextStep ? (
            <button
              disabled={!answer || (Array.isArray(answer) && answer.length === 0)}
              className={classes.submitButton}
              onClick={nextStep}
            >
              Дальше
            </button>
          ) : (
            <button
              disabled={isPending || (!answer || (Array.isArray(answer) && answer.length === 0))}
              className={classes.submitButton}
              onClick={() => {
                setIsPending(true);
                surveyAnswersService.saveSurveyAnswers({
                  answers: answers as TSurveyAnswers,
                  lesson: lesson,
                  userEmail: user.email,
                }).finally(() => {
                  setIsPending(false);
                  setIsSuccess(true);
                })
              }}
            >
              {isPending ? <Spinner variant='local' />
              : stepsCount === 1 ? 'Отправить' : 'С вопросами — все!'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

interface ISelectStepProps<Step extends ISurveySelectStep<Option>, Option = Step['options'][number]> {
  options: Option[]
  selectedValue?: Step extends ISurveyCheckboxStep ? Option[] : Option
  onSelect: (selectedValue: Step extends ISurveyCheckboxStep ? Option[] : Option ) => void
}

function Step(step: Omit<ISurveyStep, 'type'> & { children: ReactNode }) {
  return (
    <>
      <div className={classes.surveyHeader}>
        {step.title && <div className={classes.surveyTitle}>{step.title}</div>}
        {step.subtitle && <div className={classes.surveySubtitle}>{step.subtitle}</div>}
        {step.description && <div className={classes.surveyDescription}>{step.description}</div>}
      </div>
      {step.children}
    </>
  );
}

function SelectRadioStep(props: ISelectStepProps<ISurveyRadioStep>) {
  return (
    <Step {...props}>
      <div className={classes.surveyAnswers}>
        {props.options.map((option, index) => (
          <label key={index} htmlFor={`radio-${index}`} className={classes.surveyAnswer}>
            <div className={cx({ radio: true, checked: props.selectedValue === option })}>
              <span className={classes.visuallyHidden}>
                <input
                  id={`radio-${index}`}
                  type="radio"
                  onClick={() => props.onSelect(option)}
                />
              </span>
              <div className={classes.icon}>
                <Icon icon='Tick'/>
              </div>
            </div>
            <span>{option}</span>
          </label>
        ))}
      </div>
    </Step>
  );
}

function SelectCheckboxStep(props: ISelectStepProps<ISurveyCheckboxStep>) {
  return (
    <Step {...props}>
      <div className={classes.surveyAnswers}>
        {props.options.map((option, index) => (
          <label key={index} htmlFor={`checkbox-${index}`} className={classes.surveyAnswer}>
            <div className={cx({ checkbox: true, checkboxWithMovementAnimation: true, checked: props.selectedValue?.includes(option) })}>
              <span className={classes.visuallyHidden}>
                <input
                  id={`checkbox-${index}`}
                  type="checkbox"
                  onChange={() => {
                    if (!props.selectedValue || !props.selectedValue.includes(option)) {
                      props.onSelect([...(props.selectedValue ?? []), option]);
                    } else {
                      const set = new Set(props.selectedValue);
                      set.delete(option);
                      props.onSelect([...set]);
                    }
                  }}
                />
              </span>
              <div className={classes.icon}>
                <Icon icon='Tick'/>
              </div>
            </div>
            <span>{option}</span>
          </label>
        ))}
      </div>
    </Step>
  );
}

function SelectCardStep(props: ISelectStepProps<ISurveyCardStep>) {
  return (
    <Step {...props}>
      <div className={classes.cards}>
        {props.options.map((option, index) => (
          <button
            key={index}
            className={cx({
              card: true,
              active: props.selectedValue?.title === option.title && props.selectedValue?.subtitle === option.subtitle,
            })}
            onClick={() => props.onSelect(option)}
          >
            <div className={classes.cardTitle}>{option.title}</div>
            <div className={classes.cardSubtitle}>{option.subtitle}</div>
          </button>
        ))}
      </div>
    </Step>
  );
}
