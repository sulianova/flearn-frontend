import { useCallback, useState } from 'react';

import { IArticleQuizBlock } from 'types';

import RadioStep from './RadioStep';
import CheckboxStep from './CheckboxStep';

import classes from './Quiz.module.scss';
interface IProps extends Omit<IArticleQuizBlock, 'type'> {
  onSubmit: () => void
  isInitialSolvedQuiz: boolean
}

export default function Quiz(props: IProps) {
  const { steps, onSubmit, isInitialSolvedQuiz } = props;
  const [currentStepIndex, setCurrentStepIndex] = useState(isInitialSolvedQuiz ? steps.length : 0); // from 0 to length. Index === length => all steps are submited

  const onSubmitStep = useCallback(() => {
    const nextIndex = currentStepIndex + 1;
    setCurrentStepIndex(nextIndex);
    if (nextIndex === steps.length) {
      onSubmit();
    }
  }, [currentStepIndex, steps, onSubmit]);

  return (
    <div className={classes.__}>
      {steps.map((step, index) => {
        if (step.type === 'SELECT' && step.variant === 'RADIO') {
          return (
            <RadioStep
              key={index}
              step={step}
              visible={index <= currentStepIndex}
              onSubmit={onSubmitStep}
              isInitialSolvedQuiz={isInitialSolvedQuiz}
            />
          );
        } else if (step.type === 'SELECT' && step.variant === 'CHECKBOX') {
          return (
            <CheckboxStep
              key={index}
              step={step}
              visible={index <= currentStepIndex}
              onSubmit={onSubmitStep}
              isInitialSolvedQuiz={isInitialSolvedQuiz}
            />
          );
        }
      })}
    </div>
  );
}
