export interface ISurveyStep {
  title?: string
  subtitle?: string
  description?: string
}

export interface ISurveySelectStep<T> extends ISurveyStep {
  type: 'SELECT'
  options: T[]
}

export interface ISurveyRadioStep extends ISurveySelectStep<string> {
  variant: 'RADIO'
}

export interface ISurveyCheckboxStep extends ISurveySelectStep<string> {
  variant: 'CHECKBOX'
}

export interface ISurveyCardStep extends ISurveySelectStep<{ title: string, subtitle: string }> {
  variant: 'CARD'
}

export type TSurveyStep =
  | ISurveyRadioStep
  | ISurveyCheckboxStep
  | ISurveyCardStep;

export type TSurvey = Record<number, TSurveyStep>;

export type TSurveyAnswer<T extends TSurveyStep = TSurveyStep> = T['variant'] extends 'CHECKBOX' ? T['options'] : T['options'][number];
export type TSurveyAnswers<T extends TSurvey = TSurvey> = {
  [Key in keyof T]?: T[Key] extends TSurveyStep ? TSurveyAnswer<T[Key]> : never
}
