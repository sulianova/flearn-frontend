import { authService } from 'services';

import Icon from 'ui/Icon/Icon';
import GeneralPopup from 'ui/GeneralPopup/GeneralPopup';

interface IProps {
  text: string
  close: () => void
  onSuccess?: () => void
}

export default function SignupGooglePopup(props: IProps) {
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
            onClick={() =>
              authService.authenticate()
                .then(props.onSuccess)
            }
          >
            <Icon icon='Google'/>
            Продолжить с Google
          </GeneralPopup.Btn>
          <GeneralPopup.Oferta/>
        </>
      )}
    </GeneralPopup>
  );
}
