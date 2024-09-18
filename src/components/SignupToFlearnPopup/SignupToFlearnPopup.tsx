import { useState } from 'react';

import { formatI18nT } from 'shared';

import Icon from 'ui/Icon/Icon';
import Popup from 'ui/Popup/Popup';

import Form from './Form/Form';
import classes from './SignupToFlearnPopup.module.scss';

const t = formatI18nT('SignupToFlearnPopup');

interface IProps {
  close: () => void
}

export default function SignupToFlearnPopup(props: Readonly<IProps>) {
  const [orderEmail, setOrderEmail] = useState<string | null>(null);

  return (
    <Popup
      close={props.close}
      children={startClosingProcess => (
        <div className={classes.__}>
          <div className={classes.close} onClick={startClosingProcess}>
            <Icon icon='Cross'/>
          </div>
          {orderEmail && (
            <div className={classes.imgWrapper}>
              <Icon icon='EmailSent'/>
            </div>
          )}
          <div className={classes.header}>
            {
              !orderEmail
              ? <div className={classes.titleForm}>{t('titleEmailForm')}</div>
              : <div className={classes.titleLogin}>{t('titleEmailFormSubmitted', { email: orderEmail })}</div>
            }
          </div>
            <Form
              onOrderCreated={({ email }) => setOrderEmail(email)}
            />
        </div>
      )}
    />
  );
}
