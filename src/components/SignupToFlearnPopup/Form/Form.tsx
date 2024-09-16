import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { URLSections } from 'router';
import { authService } from 'services';
import { analyticsService } from 'services/analytics.service';
import { emailService } from 'services/email.service';
import { formatI18nT } from 'shared';

import InputField from 'ui/Form/Input/InputField';
import Link from 'ui/Link/Link';
import Spinner from 'ui/Spinner/Spinner';
import Icon from 'ui/Icon/Icon';

import classes from './Form.module.scss';
import classesInputField from './InputField.module.scss';

const cx = classNames.bind(classes);
const cx2 = classNames.bind(classesInputField);
const t = formatI18nT('SignupToFlearnPopup');

interface IFormData {
  email: string
  state: { type: 'Idle' } |  { type: 'Pending' } | { type: 'Success' } | { type: 'Error', error: Error }
}

const initialFormData: IFormData = { email: '', state: { type: 'Idle' } };

interface IProps {
  onOrderCreated: (props: { email: string }) => void
}

export default function Form({ onOrderCreated }: IProps) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<IFormData>(() => authService.user ? ({ ...initialFormData, email: authService.user.email! }) : initialFormData);
  const [orderIsCreated, setOrderIsCreated] = useState(false);

  useEffect(() => {
    if (formData.state.type === 'Success') {
      onOrderCreated({ email: formData.email });
      setOrderIsCreated(true);
    }
  }, [formData, onOrderCreated]);

  if (orderIsCreated) {
    return (
      <button
        className={classes.btn}
        onClick={() =>
          authService.authenticate()
            .then(() => {
              analyticsService.logEvent({ type: analyticsService.event.ButtonClickedStartStudy });
              navigate(URLSections.EmptyProfile.to());
            })
        }
      >
        <div className={classes.content}>
          <Icon icon='Google'/>
          Продолжить с Google
        </div>
      </button>
    );
  }

  return (
    <>
      <form
        className={classes.form}
        onSubmit={isValid(formData) ? () => submit({ formData, setFormData }) : undefined}
      >
          <InputField
            className={cx2({ input: true, isError: formData.state.type === 'Error', isValid: isValid(formData) })}
            variant='Email'
            value={formData.email}
            onChange={v => setFormData(d => ({ ...d, email: v }))}
          />
          <button
            className={cx({ submitButton: true, [`is${formData.state.type}`]: true })}
            type="submit"
            disabled={!isValid(formData)}
            onClick={() => submit({ formData, setFormData })}
          >
            <span className={classes.btnSvg}>
              {
                formData.state.type === 'Idle' ?  <>Начать учиться бесплатно</>:
                formData.state.type === 'Pending' ? <Spinner/> :
                formData.state.type === 'Success' ?  <Icon icon='Tick'/>  :
                formData.state.type === 'Error' ? <Icon icon='Refresh'/> : ''
              }
            </span>
          </button>
        {formData.state.type === 'Error' && <span className={classes.Error}>{formData.state.error.message}</span>}
        <div className={classes.agreement}>
          <Link
            className='s-hoverable'
            to={URLSections.Static.Oferta.index}
            target='_blank'
          >
            <span className={classes.agreementText}>
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

async function submit(props: {
  formData: IFormData,
  setFormData: React.Dispatch<React.SetStateAction<IFormData>>,
}) {
  const { formData, setFormData } = props;
  setFormData(d => ({ ...d, state: { type: 'Pending' } }));
  try {
    await emailService.sendEmail({
      type: emailService.EEmail.WelcomeToFlearn,
      to: { email: formData.email },
    });
    analyticsService.logEvent({ type: analyticsService.event.GenerateLead });
    setFormData(d => ({ ...d, state: { type: 'Success' } }));
  } catch (e) {
    setFormData(d => ({ ...d, state: { type: 'Error', error: e as Error } }));
  }
}
