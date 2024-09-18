import { authService } from 'services';

import Icon from 'ui/Icon/Icon';
import Popup from 'ui/Popup/Popup';

import classes from './SignupGooglePopup.module.scss';
interface IProps {
  text: string
  close: () => void
  onSuccess?: () => void
}

export default function SignupGooglePopup(props: IProps) {
  return (
    <Popup
      close={props.close}
      children={startClosingProcess => (
        <div className={classes.__}>
          <div className={classes.close} onClick={startClosingProcess}>
            <Icon icon='Cross'/>
          </div>
          <div className={classes.header}>
            <div className={classes.titleLogin}>
              {props.text}
            </div>
          </div>
          <button
            className={classes.btn}
            onClick={() =>
              authService.authenticate()
                .then(props.onSuccess)
            }
          >
            <div className={classes.content}>
              <Icon icon='Google'/>
              Продолжить с Google
            </div>
          </button>
        </div>
      )}
    />
  );
}
