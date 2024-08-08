import type { TText } from 'ui/Text/types';
import type { IImageData, IImageDataDB } from '.';

export interface IQuizStepCommon {
  title?: TText
  subtitle?: TText
  description?: TText
  image?: IImageData
}

export interface IQuizStepCommonDB {
  title?: TText
  subtitle?: TText
  description?: TText
  image?: IImageDataDB
}

export interface IQuizSelectStep<T> {
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

export interface IQuizRadioStep extends IQuizStepCommon, IQuizSelectStep<TText> {
  variant: 'RADIO'
}

export interface IQuizRadioStepDB extends IQuizStepCommonDB, IQuizSelectStep<TText> {
  variant: 'RADIO'
}

export interface IQuizCheckboxStep extends IQuizStepCommon, IQuizSelectStep<TText> {
  variant: 'CHECKBOX'
}

export interface IQuizCheckboxStepDB extends IQuizStepCommonDB, IQuizSelectStep<TText> {
  variant: 'CHECKBOX'
}

export type TQuizStep =
  | IQuizRadioStep
  | IQuizCheckboxStep;

export type TQuizStepDB =
  | IQuizRadioStepDB
  | IQuizCheckboxStepDB;

export interface IQuize {
  steps: TQuizStep[]
}

export interface IQuizeDB {
  steps: TQuizStepDB[]
}
