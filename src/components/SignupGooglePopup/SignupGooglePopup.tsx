import { authService } from 'services';

import Icon from 'ui/Icon/Icon';
import GeneralPopup from 'ui/GeneralPopup/GeneralPopup';
import { useState } from 'react';
import Spinner from 'ui/Spinner/Spinner';

interface IProps {
  text: string
  close: () => void
  onSuccess?: () => void
}

export default function SignupGooglePopup(props: IProps) {
  const [loginPending, setLoginPending] = useState(false);

  return (
    <GeneralPopup
      close={props.close}
    >
      {classes => (
        <>
          <div className={classes.header}>
            <div className={classes.cx({ title: true, title_center: true })}>
              {props.text}
            </div>
          </div>
          <GeneralPopup.Btn
            className={GeneralPopup.Btn.classesWithCx.cx({ btn_primary: true, btn_loading: loginPending })}
            onClick={() => {
              setLoginPending(true);
              authService.authenticate()
                .then(props.onSuccess)
                .finally(() => setLoginPending(false));
            }}
          >
            {loginPending ? <Spinner/> : (
              <>
                <Icon icon='Google'/>
                Продолжить с Google
              </>
            )}
          </GeneralPopup.Btn>
          <GeneralPopup.Oferta/>
        </>
      )}
    </GeneralPopup>
  );
}
