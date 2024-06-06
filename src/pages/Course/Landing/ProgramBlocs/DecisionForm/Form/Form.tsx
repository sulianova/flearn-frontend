import classNames from 'classnames/bind';
import { useCallback, useEffect, useState } from 'react';
import Link from 'ui/Link/Link';

import { authService, dataService } from 'services';
import { emailService } from 'services/email.service';
import { formatI18nT } from 'shared';
import store from 'store';

import InputField from 'ui/Form/Input/InputField';
import Spinner from 'ui/Spinner/Spinner';

import classes from './Form.module.scss';
import classesInputField from './InputField.module.scss';
import { IRootState } from 'types';
import { userService } from 'services/user.service';

const cx = classNames.bind(classes);
const cx2 = classNames.bind(classesInputField);
const t = formatI18nT('courseLanding.form');

interface IFormData {
  email: string
  state: { type: 'Idle' } |  { type: 'Pending' } | { type: 'Success' } | { type: 'Error', error: Error }
}

const initialFormData: IFormData = { email: '', state: { type: 'Idle' } };

interface IProps {
  onOrderCreated: (props: { email: string }) => void
  courseIsFree: boolean
}

export default function Form({ onOrderCreated, courseIsFree }: IProps) {
  const [formData, setFormData] = useState<IFormData>(() => authService.user ? ({ ...initialFormData, email: authService.user.email! }) : initialFormData);
  const handleSubmit = useCallback((formData: IFormData) => submit({ formData, setFormData, courseIsFree }), [courseIsFree]);

  useEffect(() => {
    if (formData.state.type === 'Success') {
      onOrderCreated({ email: formData.email });
    }
  }, [formData, onOrderCreated]);

  return (
    <>
      <form
        className={classes.form}
        onSubmit={isValid(formData) ? () => handleSubmit(formData) : undefined}
      >
        {formData.state.type === 'Error' && <span className={classes.Error}>{formData.state.error.message}</span>}
        <div className={classes.inputWrap}>
          <InputField
            className={cx2({ input: true, light: true, isError: formData.state.type === 'Error' }) + ' s-text-24'}
            variant='Email'
            value={formData.email}
            onChange={v => setFormData(d => ({ ...d, email: v }))}
          />
          <button
            className={cx({ submitButton: true, isDisabled: !isValid(formData), [`is${formData.state.type}`]: true }) + ' s-text-56'}
            type="submit"
            disabled={!isValid(formData)}
            onClick={() => handleSubmit(formData)}
          >
            <span>
              {
                formData.state.type === 'Idle' ? '→' :
                formData.state.type === 'Pending' ? <Spinner/> :
                formData.state.type === 'Success' ? '✓' :
                formData.state.type === 'Error' ? '\u21aa' : ''
              }
            </span>
          </button>
        </div>
        <div className={classes.agreement}>
                    <Link
                      className='link'
                      // to={URLSections.Static.Oferta.index}
                      target='_blank'
                    >
                      <span className={classes.agreementText + ' s-text-16'}>
                        {t('agreement')}
                      </span>
                    </Link>
                </div>
      </form>
    </>
  );
}

function isValid(formData: IFormData) {
  const { email, state } = formData;
  return email && state.type !== 'Pending';
}

async function submit(props: { formData: IFormData, setFormData: React.Dispatch<React.SetStateAction<IFormData>>, courseIsFree: boolean }) {
  const { formData, setFormData, courseIsFree } = props;
  setFormData(d => ({ ...d, state: { type: 'Pending' } }));
  try {
    const state = store.getState() as IRootState;
    const courseData = state.course.data;
    const userData = await userService.getAuthenticatedUser() ?? undefined;
    if (!courseData) {
      throw new Error('Failed to get course from store');
    }
    const { id: orderId } = await dataService.order.create({ userFromForm: formData, courseData, userData });
    if (courseIsFree) {
      const accessValue = courseData.id !== 'finding-your-style';
      await dataService.access.add(courseData.id, formData.email, accessValue);
    }
    await emailService.sendEmail({
      type: emailService.EEmail.PaymentMethods,
      to: { email: formData.email },
      orderId,
      course: courseData,
    });
    setFormData(d => ({ ...d, state: { type: 'Success' } }));
  } catch (e) {
    setFormData(d => ({ ...d, state: { type: 'Error', error: e as Error } }));
  }
}
