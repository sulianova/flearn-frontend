import classNames from 'classnames/bind';
import { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { dataService } from 'services';
import { emailService } from 'services/email.service';
import type { IUserData } from 'services/user.service';
import { formatI18nT } from 'shared';
import store from 'store';

import InputField from 'ui/Form/Input/InputField';
import Spinner from 'ui/Spinner/Spinner';

import classes from './Form.module.scss';
import classesInputField from './InputField.module.scss';

import type { IRootState } from 'types';

export default connect(mapStateToProps)(Form);

const cx = classNames.bind(classes);
const cx2 = classNames.bind(classesInputField);
const t = formatI18nT('courseLanding.form');

interface IFormData {
  email: string
  state: { type: 'Idle' } |  { type: 'Pending' } | { type: 'Success' } | { type: 'Error', error: Error }
}

const initialFormData: IFormData = { email: '', state: { type: 'Idle' } };

interface IConnectedProps {
  user?: IUserData
}

function mapStateToProps(state: IRootState): IConnectedProps {
  return {
    user: state.user.user,
  };
}

interface IProps extends IConnectedProps {
  onOrderCreated: (props: { email: string }) => void
  courseIsFree: boolean
}

function Form({ user, onOrderCreated, courseIsFree }: IProps) {
  const [formData, setFormData] = useState<IFormData>(() => user ? ({ ...initialFormData, email: user.email }) : initialFormData);
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
            className={cx({ submitButton: true, isDisabled: !isValid(formData), [`is${formData.state.type}`]: true }) + ' s-text-36'}
            type="submit"
            disabled={!isValid(formData)}
            onClick={() => handleSubmit(formData)}
          >
            <span>
              {
                formData.state.type === 'Idle' ? '→' :
                formData.state.type === 'Pending' ? <Spinner/> :
                formData.state.type === 'Success' ? '✓' :
                formData.state.type === 'Error' ? '↻' : ''
              }
            </span>
          </button>
        </div>
      </form>
      <div className={classesInputField.inputCaption + ' s-text-18'}>{t('emailCaption')}</div>
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
    const userData = state.user.user;
    if (!courseData) {
      throw new Error('Failed to get course from store');
    }
    await dataService.order.create({ userFromForm: formData, courseData, userData });
    if (courseIsFree) {
      await dataService.access.add(courseData.id, formData.email);
    }
    await emailService.sendEmail(formData.email);
    setFormData(d => ({ ...d, state: { type: 'Success' } }));
  } catch (e) {
    setFormData(d => ({ ...d, state: { type: 'Error', error: e as Error } }));
  }
}
