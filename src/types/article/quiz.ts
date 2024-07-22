import type { TText } from 'ui/Text/types';

export interface IQuizStep {
  title?: TText
  subtitle?: TText
  description?: TText
}

export interface IQuizSelectStep<T> extends IQuizStep {
  type: 'SELECT'
  options: Array<{
    value: T
  } & ({
    shouldBeSelected: true
    positiveExplanation?: TText // user has selected => e.g. 'Yes! Fish can fly. Good job!!!'
    negativeExplanation?: TText // user hasn't selected => e.g. 'Oops. Actualy some fish can fly. Do better job nex time...'
  } | {
    shouldBeSelected: false
    negativeExplanation?: TText // user hasn't selected => e.g. 'Oops. Actualy mount Everest height is 8,849m and not 8,848m...'
  })>
}

export interface IQuizRadioStep extends IQuizSelectStep<TText> {
  variant: 'RADIO'
}

export interface IQuizCheckboxStep extends IQuizSelectStep<TText> {
  variant: 'CHECKBOX'
}

export type TQuizStep =
  | IQuizRadioStep
  | IQuizCheckboxStep;

export interface IQuize {
  steps: TQuizStep[]
}
