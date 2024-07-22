import classNames from 'classnames/bind';
import { Fragment, useState } from 'react';

import { useGetId } from 'hooks';
import { IQuizRadioStep } from 'types';

import UIText from 'ui/Text/Text';
import Icon from 'ui/Icon/Icon';

import classes from './Quiz.module.scss';

const cx = classNames.bind(classes);

interface IProps {
  step: IQuizRadioStep
  visible: boolean
  onSubmit: () => void
  isInitialSolvedQuiz: boolean
}

export default function RadioStep(props: IProps) {
  const getId = useGetId()
  const { step, visible, onSubmit } = props;
  const [selectedValueIndex, setSelectedValueIndex] = useState<number | undefined>(
    props.isInitialSolvedQuiz ? step.options.findIndex(o => o.shouldBeSelected) : undefined
  );
  const [showAnswers, setShowAnswers] = useState(props.isInitialSolvedQuiz);

  return (
    <div className={cx({ wrapper: true, wrapperVisible: visible, submited: showAnswers })}>
      <form className={classes.content}>
        <div className={classes.quizHeader}>
          {step.title && <div className={classes.quizTitle}><UIText text={step.title}/></div>}
          {step.subtitle && <div className={classes.quizSubtitle}><UIText text={step.subtitle}/></div>}
          {step.description && <div className={classes.quizDescription}><UIText text={step.description}/></div>}
        </div>
        <fieldset className={classes.quizGroup} role='radiogroup'>
          {step.options.map((option, index) => (
            <div
              key={index}
              className={cx({
                quizGroupItem: true,
                shouldBeChecked: option.shouldBeSelected,
                shouldNotBeChecked: !option.shouldBeSelected,
              })}
            >
              <label
                htmlFor={getId(index)}
                className={classes.choiceOption}
              >
                <div className={cx({
                    radio: true,
                    checked: selectedValueIndex === index,
                  })}
                >
                  <span className={classes.visuallyHidden}>
                    <input
                      type="radio"
                      id={getId(index)}
                      onClick={() => {
                        if (showAnswers) {
                          return;
                        }
                        setSelectedValueIndex(index);
                      }}
                    />
                  </span>
                  <div className={classes.icon}>
                    <Icon icon='Tick'/>
                  </div>
                </div>
                <span>
                  <UIText text={option.value}/>
                </span>
              </label>
              {showAnswers && option.shouldBeSelected && option.positiveExplanation && selectedValueIndex === index && (
                <div className={classes.feedbackShouldBeChecked}>
                  <UIText text={option.positiveExplanation}/>
                </div>
              )}
              {showAnswers && option.shouldBeSelected && option.negativeExplanation && selectedValueIndex !== index && (
                <div className={classes.feedbackShouldBeChecked}>
                  <UIText text={option.negativeExplanation}/>
                </div>
              )}
              {showAnswers && !option.shouldBeSelected && option.negativeExplanation && selectedValueIndex === index && (
                <div className={classes.feedbackShouldNotBeChecked}>
                  <UIText text={option.negativeExplanation}/>
                </div>
              )}
            </div>
          ))}
        </fieldset>
        {!showAnswers && (
          <button
            disabled={selectedValueIndex === undefined}
            className={classes.submitButton}
            onClick={() => {
              setShowAnswers(true);
              onSubmit();
            }}
          >
            Узнать ответ
          </button>
        )}
      </form>
    </div>
  );
}
