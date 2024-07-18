import classNames from 'classnames/bind';
import { Fragment, useState } from 'react';

import { useGetId } from 'hooks';
import { IQuizCheckboxStep } from 'types';

import UIText from 'ui/Text/Text';
import Icon from 'ui/Icon/Icon';

import classes from './Quiz.module.scss';

const cx = classNames.bind(classes);

interface IProps {
  step: IQuizCheckboxStep
  visible: boolean
  onSubmit: () => void
  isInitialSolvedQuiz: boolean
}

export default function CheckboxStep(props: IProps) {
  const { step, visible, onSubmit, isInitialSolvedQuiz } = props;
  const getId = useGetId();
  const [selectedValueIndexes, setSelectedValueIndexes] = useState<number[]>(
    () => isInitialSolvedQuiz
      ? step.options.map((o, i) => ({ i, o })).filter(v => v.o.shouldBeSelected).map(o => o.i)
      : []
  );
  const [showAnswers, setShowAnswers] = useState(isInitialSolvedQuiz);

  return (
    <div className={cx({ wrapper: true, wrapperVisible: visible })}>
      <form className={classes.content}>
        <div className={classes.quizHeader}>
          {step.title && <div className={classes.quizTitle}><UIText text={step.title}/></div>}
          {step.subtitle && <div className={classes.quizSubtitle}><UIText text={step.subtitle}/></div>}
          {step.description && <div className={classes.quizDescription}><UIText text={step.description}/></div>}
        </div>
        <fieldset className={classes.quizGroup}>
          {step.options.map((option, index) => (
            <Fragment key={index}>
              <label
                htmlFor={getId(index)}
                className={classes.choiceOption}
              >
                <div className={cx({
                    checkbox: true,
                    checked: selectedValueIndexes.includes(index),
                    shouldBeChecked: showAnswers && option.shouldBeSelected,
                    shouldNotBeChecked: showAnswers && !option.shouldBeSelected,
                  })}
                >
                  <span className={classes.visuallyHidden}>
                    <input
                      type="checkbox"
                      id={getId(index)}
                      onChange={() => {
                        if (!selectedValueIndexes.includes(index)) {
                          setSelectedValueIndexes(v => [...v, index]);
                        } else {
                          const set = new Set(selectedValueIndexes);
                          set.delete(index);
                          setSelectedValueIndexes([...set]);
                        }
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
              {showAnswers && selectedValueIndexes.includes(index) && option.shouldBeSelected && (
                <div className={classes.feedbackShouldBeChecked}>
                  <UIText text={option.positiveExplanation}/>
                </div>
              )}
              {showAnswers && !selectedValueIndexes.includes(index) && option.shouldBeSelected && (
                <div className={classes.feedbackShouldBeChecked}>
                  <UIText text={option.negativeExplanation}/>
                </div>
              )}
              {showAnswers && selectedValueIndexes.includes(index) && !option.shouldBeSelected && (
                <div className={classes.feedbackShouldNotBeChecked}>
                  <UIText text={option.negativeExplanation}/>
                </div>
              )}
            </Fragment>
          ))}
        </fieldset>
        {!showAnswers && (
          <button
            disabled={selectedValueIndexes.length === 0}
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
