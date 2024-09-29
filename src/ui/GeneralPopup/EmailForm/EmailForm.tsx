import classNames from 'classnames/bind';
import { useState } from 'react';

import { authService } from 'services';

import InputField from 'ui/Form/Input/InputField';
import Spinner from 'ui/Spinner/Spinner';
import Icon from 'ui/Icon/Icon';

import classes from './EmailForm.module.scss';
import { validators } from 'utils/validators';

const cx = classNames.bind(classes);

interface IFormData {
  email: string
  emailValid: boolean
  state: { type: 'Idle' } | { type: 'Loading' } | { type: 'Success' } | { type: 'Error', error: Error }
}

const initialFormData: IFormData = { email: '', emailValid: true,  state: { type: 'Idle' } };

interface IProps {
  submitText: string
  handleSubmit: (email: string) => Promise<void>
}

export default function EmailForm({ submitText, handleSubmit }: IProps) {
  const [formData, setFormData] = useState<IFormData>(() => authService.user ? ({ ...initialFormData, email: authService.user.email! }) : initialFormData);

  return (
    <>
      <form
        className={classes.form}
        onSubmit={isValid(formData) ? () => submit({ formData, setFormData, handleSubmit }) : undefined}
      >
          <InputField
            variant='Email'
            value={formData.email}
            className={cx({ input: true })}
            onChange={v => setFormData(d => ({ ...d, email: v }))}
            state={formData.emailValid ? 'idle' : 'error'}
            onBlur={() => setFormData(d => ({ ...d, emailValid: true }))} //validators.email(d.email) }))}
            caption={formData.emailValid ? undefined : 'Введите верный email'}
          />
          {formData.state.type === 'Error' && <span className={classes.Error}>{formData.state.error.message}</span>}
          <button
            className={cx({ submitButton: true, [`is${formData.state.type}`]: true })}
            type="submit"
            disabled={!isValid(formData)}
            onClick={() => submit({ formData, setFormData, handleSubmit })}
          >
            <div className={classes.content}>
              {
                formData.state.type === 'Idle' ? submitText:
                formData.state.type === 'Loading' ? <div className={classes.loader}><Spinner/></div>:
                formData.state.type === 'Success' ?  <Icon icon='Tick'/>:
                formData.state.type === 'Error' ? submitText: ''
              }
            </div>
          </button>
      </form>
    </>
  );
}

function isValid(formData: IFormData) {
  const { emailValid, state } = formData;
  return emailValid && state.type !== 'Loading';
}

async function submit(props: {
  formData: IFormData,
  setFormData: React.Dispatch<React.SetStateAction<IFormData>>,
  handleSubmit: (email: string) => Promise<void>,
}) {
  const { formData, setFormData, handleSubmit } = props;
  setFormData(d => ({ ...d, state: { type: 'Loading' } }));
  handleSubmit(formData.email)
    .then(() => setFormData(d => ({ ...d, state: { type: 'Success' } })))
    .catch(e => setFormData(d => ({ ...d, state: { type: 'Error', error: e as Error } })))
}
