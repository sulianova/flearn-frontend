import classNames from 'classnames/bind';
import { formatI18nT, i18n } from 'shared';

import InputField, { IProps as IInputFieldProps } from 'ui/Form/Input/InputField';
import Link from 'ui/Link/Link';
import classes from './DecisionForm.module.scss';
import classesInputField from './InputField.module.scss';

import { useCallback, useEffect, useState } from 'react';
import { URLSections, type ICourseData, type IRootState } from 'types';
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
  state: { type: 'idle' } |  { type: 'pending' } | { type: 'success' } | { type: 'error', error: Error }
}

const initialFormData: IFormData = { email: '', name: '', phone: '', termsAgreed: true, state: { type: 'idle' } };

function DecisionForm(props: IProps) {
  const [formData, setFormData] = useState<IFormData>(initialFormData);

  useEffect(() => {
    const user = (store.getState() as IRootState).user?.user;
    if (user) {
      setFormData(d => ({ ...d, email: user.email, name: user.displayName ?? '' }));
    }
  }, []);

  const handleSubmit = useCallback(async (formData: IFormData) => {
    setFormData(d => ({ ...d, state: { type: 'pending' } }));
    const { email, name, phone } = formData;
    try {
      await dataService.order.create({ email, name, phone });
      setFormData({ ...initialFormData, state: { type: 'success' } });
    } catch (e) {
      setFormData(d => ({ ...d, state: { type: 'error', error: e as Error } }));
    }
  }, []);

  return (
    <div className={classes.wrapper} id='decision-form'>
      <div className={cx({ block: true, blockDetails: true })}>
        <div className={classes.titleWrapper}>
          <div>
            <div className={classes.subtitle + ' s-text-24'}>{t('title')}</div>
            <h1 className={classes.title}>{t('courseName', { courseName: props.data.title })}</h1>
          </div>
          <div className={classes.courseInfo}>
            <div className={' s-text-18'}>{formatCourseDate(props.data.startDate, props.data.durationWeeks)}</div>
            <div className={' s-text-18'}>{formatDurationWeeks(props.data.durationWeeks)}</div>
          </div>
        </div>
        <div className={classes.credit}>
          <s className={classes.creditWas + ' s-text-24'}>{formatCredit(props.data.creditWas)} &#8381;</s>
          <div className={classes.creditPrice + ' s-text-88'}>
            {formatCredit(props.data.creditPrice)} &#8381;
            <span className={classes.discount + ' s-text-18'}>{formatCourseDiscount(props.data.discontAmount)}</span>
          </div>
        </div>
      </div>
      <div className={classes.block}>
        {renderForm(formData, setFormData, handleSubmit)}
        <div className={classesInputField.inputCaption + ' s-text-18'}>{t('emailCaption')}</div>
        <div className={classes.agreement}>
          <Link
            className='key-link'
            to={URLSections.Static.Oferta.index}
            target='_blank'
          >
            <span className={classes.agreementText + ' s-text-18'}>
              {t('agreement')}
            </span>
          </Link>
        </div>
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
      {formData.state.type === 'error' && <span className={classes.Error}>{formData.state.error.message}</span>}
      {formData.state.type === 'success' && <span className={classes.Success}>Order is created!</span>}
      <div className={classes.inputWrap}>
        <InputField
          className={cx2({ input: true, light: true }) + ' s-text-24'}
          variant='Email'
          value={formData.email}
          onChange={v => setFormData(d => ({ ...d, email: v }))}
        />
        <button
          className={cx({ submitButton: true, isDisabled: false }) + ' s-text-36'}
          type="submit"
          disabled={!isValid(formData)}
          onClick={() => handleSubmit(formData)}
        >
          <span className={classes.isDefault}>→</span>
          {/* <span className={classes.isSuccess}>✓</span> */}
          {/* <span className={classes.isLoading}></span> */}
          {/* <span className={classes.isReset}>↻</span> */}
        </button>
      </div>
    </form>
  );
}

function isValid(formData: IFormData) {
  const { termsAgreed, name, email, phone, state } = formData;
  return termsAgreed && name  && email && phone && state.type !== 'pending';
}


function formatCourseDate(startDate: Date, durationWeeks: number) {
  const startDateStr = startDate.toLocaleDateString(
    ['ru-RU'],
    { month: 'long', day: 'numeric' }
  );
  const endDateStr = 'посчитать';

  return `${startDateStr} – ${endDateStr}`;
}

function formatDurationWeeks(durationWeeks: number) {
  return `${durationWeeks} недель`
}