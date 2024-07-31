import classNames from 'classnames/bind';
import { Fragment, useState } from 'react';

import { useGetId } from 'hooks';
import { IQuizCheckboxStep } from 'types';

import UIText from 'ui/Text/Text';
import Icon from 'ui/Icon/Icon';
import Img from 'ui/Img/Img';
import ImageModal, { type IImage } from 'ui/ImageModal/ImageModal';

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
  const [openedImage, setOpenedImage] = useState<IImage | null>(null);

  return (
    <>
      <div className={cx({ wrapper: true, wrapperVisible: visible, submited: showAnswers })}>
        <form className={classes.content}>
          <div className={classes.quizHeader}>
            {step.title && <div className={classes.quizTitle}><UIText text={step.title}/></div>}
            {step.subtitle && <div className={classes.quizSubtitle}><UIText text={step.subtitle}/></div>}
            {step.description && <div className={classes.quizDescription}><UIText text={step.description}/></div>}
            {step.image && (
              <div
                id={getId(step.image.id)}
                onClick={() => {
                  const element = document.getElementById(getId(step.image!.id));
                  if (!element) {
                    return;
                  }
                  const rect = element.getBoundingClientRect();
                  setOpenedImage({
                    data: step.image!,
                    originalSize: {
                      height: rect.height,
                      width: rect.width,
                    },
                    originalPositioning: {
                      top: rect.top,
                      left: rect.left,
                    },
                  });
                }}
              >
                <Img
                  src={step.image.src}
                  alt={step.image.alt}
                  className={cx({ quizImage: true })}
                />
              </div>
            )}
          </div>
          <fieldset className={classes.quizGroup}>
            {step.options.map((option, index) => (
              <div
                key={index}
                className={cx({
                  quizGroupItem: true,
                  highlight: option.shouldBeSelected || selectedValueIndexes.includes(index),
                  shouldBeChecked: option.shouldBeSelected,
                  shouldNotBeChecked: !option.shouldBeSelected,
                })}
              >
                <label
                  htmlFor={getId(index)}
                  className={classes.choiceOption}
                >
                  <div className={cx({
                      checkbox: true,
                      checked: selectedValueIndexes.includes(index),
                    })}
                  >
                    <span className={classes.visuallyHidden}>
                      <input
                        type="checkbox"
                        id={getId(index)}
                        onChange={() => {
                          if (showAnswers) {
                            return;
                          }
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
                {showAnswers && option.shouldBeSelected && option.positiveExplanation && selectedValueIndexes.includes(index) && (
                  <div className={classes.feedback}>
                    <UIText text={option.positiveExplanation}/>
                  </div>
                )}
                {showAnswers && option.shouldBeSelected && option.negativeExplanation && !selectedValueIndexes.includes(index) && (
                  <div className={classes.feedback}>
                    <UIText text={option.negativeExplanation}/>
                  </div>
                )}
                {showAnswers && !option.shouldBeSelected && option.negativeExplanation && selectedValueIndexes.includes(index) && (
                  <div className={classes.feedback}>
                    <UIText text={option.negativeExplanation}/>
                  </div>
                )}
              </div>
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
      {openedImage && (
        <ImageModal
          variant='IMAGE'
          image={openedImage}
          onClose={() => setOpenedImage(null)}
        />
      )}
    </>
  );
}
