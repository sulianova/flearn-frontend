import { useState } from 'react';
import { useNavigate } from 'react-router';

import { formatI18nT } from 'shared';
import { authService } from 'services';
import { analyticsService } from 'services/analytics.service';
import { emailService } from 'services/email.service';
import { URLSections } from 'router';

import Icon from 'ui/Icon/Icon';
import GeneralPopup from 'ui/GeneralPopup/GeneralPopup';
import Spinner from 'ui/Spinner/Spinner';

const t = formatI18nT('SignupToFlearnPopup');

interface IProps {
  close: () => void
}

export default function SignupToFlearnPopup(props: Readonly<IProps>) {
  const navigate = useNavigate();

  const [orderEmail, setOrderEmail] = useState<string | null>(null);
  const [loginPending, setLoginPending] = useState(false);

  if (!orderEmail) {
    return (
      <GeneralPopup
        close={props.close}
      >
        {classes => (
          <>
            <div className={classes.header}>
              <div className={classes.cx({ title: true, title_start: true })}>
                {t('titleEmailForm')}
              </div>
            </div>
            <GeneralPopup.EmailForm
              submitText={t('submitEmail')}
              handleSubmit={email => handleEmailSubmit(email)
                .then(() => setOrderEmail(email))
              }
            />
            <GeneralPopup.Oferta/>
          </>
        )}
      </GeneralPopup>
    );
  }

  return (
    <GeneralPopup
      close={props.close}
    >
      {classes => (
        <>
          <GeneralPopup.Img iconProps={{ icon: 'EmailSent' }}/>
          <div className={classes.header}>
            <div className={classes.cx({ title: true, title_center: true })}>
              {t('titleEmailFormSubmitted', { email: orderEmail })}
            </div>
          </div>
          <GeneralPopup.Btn
              className={GeneralPopup.Btn.classesWithCx.cx({ btn_primary: true, btn_loading: loginPending })}
              onClick={() => {
                setLoginPending(true);
                authService.authenticate()
                  .then(() => {
                    analyticsService.logEvent({ type: analyticsService.event.ButtonClickedStartStudy });
                    navigate(URLSections.EmptyProfile.to());
                  })
                  .finally(() => setLoginPending(false));
              }}
          >
            {loginPending ? <Spinner/> : (
              <>
                <Icon icon='Google'/>
                {t('login')}
              </>
            )}
          </GeneralPopup.Btn>
          <GeneralPopup.Oferta/>
        </>
      )}
    </GeneralPopup>
  );
}

async function handleEmailSubmit(email: string) {
  await emailService.sendEmail({
    type: emailService.EEmail.WelcomeToFlearn,
    to: { email },
  });
  analyticsService.logEvent({ type: analyticsService.event.GenerateLead });
}
