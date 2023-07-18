import classNames from 'classnames/bind';
import { formatI18nT, i18n } from 'shared';

import InputField, { IProps as IInputFieldProps } from 'ui/Form/Input/InputField';
import classes from './DecisionForm.module.scss';
import classesInputField from './InputField.module.scss';

import CheckboxSvg from 'assets/images/Svg/Checkbox';
import Checkbox from 'ui/Form/Checkbox/Checkbox';

import { Fragment } from 'react';
import type { ICourseData } from 'types';

export default DecisionForm;

const cx = classNames.bind(classes);
const cx2 = classNames.bind(classesInputField);

interface IProps {
  data: ICourseData
}

const t = formatI18nT('courseLanding.form');

function DecisionForm(props: IProps) {
  return (
    <div className={classes.wrapper} id='decision-form'>
      <div className={cx({ block: true, blockDetails: true })}>
        <h1 className={classes.title + ' s-text-56'}>{t('title')}</h1>
        <div className={classes.credit}>
          <s className={classes.creditWas + ' s-text-24'}>{formatCredit(props.data.creditWas)} &#8381;</s>
          <div className={classes.creditPrice + ' s-text-88'}>
            {formatCredit(props.data.creditPrice)} &#8381;
            <span className={classes.discount + ' s-text-18'}>{formatCourseDiscount(props.data.discontAmount)}</span>
            </div>
        </div>
        <div className={classes.courseName + ' s-text-18'}>{t('courseName', { courseName: props.data.title })}</div>
      </div>
      <div className={classes.block}>
        <h1 className={classes.subtitle + ' s-text-24'}>{t('subtitle')}</h1>
        {renderForm()}
      </div>
    </div>
  );
}

function formatCredit(credit: number) {
  const thousands = String(credit).slice(0, -3);
  return `${thousands} 000`;
}

function formatCourseDiscount(discontAmount: number) {
  return `-${discontAmount}%`;
}

function renderInputs(inputsType: Array<IInputFieldProps['variant']>) {
  return (
    <Fragment>
      {inputsType.map((type, index) => (
      <div
        className={classes.inputWrap}
        key={index}
      >
        <InputField className={cx2({ input: true, dark: true }) + ' s-text-24'} variant={type}/>
      </div>)
      )}
    </Fragment>
  );
}

function renderForm () {
  return (
    <form className={classes.form}>
      {renderInputs(['Name', 'Phone', 'Email'] as Array<IInputFieldProps['variant']>)}
      <div className={classes.agreement}>
        <Checkbox
          id='agreement-consult'
          className={classes.agreementCheckbox}
        >
          <CheckboxSvg/>
          <span className={classes.agreementText + ' s-text-18'}>
            {t('agreement1')}&nbsp;<a href=''>{t('agreement2')}</a>
          </span>
        </Checkbox>
      </div>
      <button className={classes.submitButton + ' s-text-24'} type='button'><span>{i18n.t('sign up')}</span></button>
    </form>
  );
}
