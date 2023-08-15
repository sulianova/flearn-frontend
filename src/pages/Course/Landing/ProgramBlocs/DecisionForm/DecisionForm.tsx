import classNames from 'classnames/bind';
import { formatI18nT, i18n } from 'shared';

import InputField, { IProps as IInputFieldProps } from 'ui/Form/Input/InputField';
import classes from './DecisionForm.module.scss';
import classesInputField from './InputField.module.scss';

import CheckboxSvg from 'assets/images/Svg/Checkbox';
import Checkbox from 'ui/Form/Checkbox/Checkbox';

import { useCallback, useEffect, useState } from 'react';
import type { ICourseData, IRootState } from 'types';
import store from 'store';
import { dataService } from 'services';

export default DecisionForm;

const cx = classNames.bind(classes);
const cx2 = classNames.bind(classesInputField);

interface IProps {
  data: ICourseData
}

const t = formatI18nT('courseLanding.form');

interface IFormData {
  email: string
  name: string
  phone: string
  termsAgreed: boolean
  pending: boolean
}

const initialFormData: IFormData = { email: '', name: '', phone: '', termsAgreed: true, pending: false };

function DecisionForm(props: IProps) {
  const [formData, setFormData] = useState<IFormData>(initialFormData);

  useEffect(() => {
    const user = (store.getState() as IRootState).user?.user;
    if (user) {
      setFormData(d => ({ ...d, email: user.email, name: user.displayName ?? '' }));
    }
  }, []);

  const handleSubmit = useCallback(async (formData: IFormData) => {
    console.log('start submit: formData: ', formData);
    setFormData(d => ({ ...d, pending: true }));
    const { email, name, phone } = formData;
    await dataService.order.create({ email, name, phone });
    setFormData(initialFormData);
  }, []);

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
        {renderForm(formData, setFormData, handleSubmit)}
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

function renderForm(
  formData: IFormData,
  setFormData: React.Dispatch<React.SetStateAction<IFormData>>,
  handleSubmit: (formData: IFormData) => void
) {
  return (
    <form
      className={classes.form}
      onSubmit={isValid(formData) ? () => handleSubmit(formData) : undefined}
    >
      <div className={classes.inputWrap}>
        <InputField
          className={cx2({ input: true, light: true }) + ' s-text-24'}
          variant='Name'
          value={formData.name}
          onChange={v => setFormData(d => ({ ...d, name: v }))}
        />
      </div>
      <div className={classes.inputWrap}>
        <InputField
          className={cx2({ input: true, light: true }) + ' s-text-24'}
          variant='Phone'
          value={formData.phone}
          onChange={v => setFormData(d => ({ ...d, phone: v }))}
        />
      </div>
      <div className={classes.inputWrap}>
        <InputField
          className={cx2({ input: true, light: true }) + ' s-text-24'}
          variant='Email'
          value={formData.email}
          onChange={v => setFormData(d => ({ ...d, email: v }))}
        />
      </div>
      <div className={classes.agreement}>
        <Checkbox
          id='agreement-consult'
          className={classes.agreementCheckbox}
          value={formData.termsAgreed}
          onChange={v => setFormData(d => ({ ...d, termsAgreed: v }))}
        >
          <CheckboxSvg/>
          <span className={classes.agreementText + ' s-text-18'}>
            {t('agreement1')}&nbsp;<a className='key-link' href=''>{t('agreement2')}</a>
          </span>
        </Checkbox>
      </div>
      <button
        className={classes.submitButton + ' s-text-24'}
        type='button'
        disabled={!isValid(formData)}
        onClick={() => handleSubmit(formData)}
      >
        <span>{i18n.t('signUp')}</span>
      </button>
    </form>
  );
}

function isValid(formData: IFormData) {
  const { termsAgreed, name, email, phone, pending } = formData;
  return termsAgreed && name  && email  && phone && !pending;
}
