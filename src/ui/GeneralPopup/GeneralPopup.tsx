import classNames from 'classnames/bind';

import Icon from 'ui/Icon/Icon';
import Popup from 'ui/Popup/Popup';

import classes from './GeneralPopup.module.scss';
import Img from './Img/Img';
import Btn from './Btn/Btn';
import EmailForm from './EmailForm/EmailForm';
import Oferta from './Oferta/Oferta';

type TClassesNames =
  | 'header'
  | 'title'
  | 'title_start'
  | 'title_center'
  | 'description';
type TCx = (a: { [key in TClassesNames]?: boolean }, b?: string) => string;
type TClasses = { [key in TClassesNames]: string };
type TClassesWithCx = TClasses & { cx: TCx };

interface IProps {
  children: (classes: TClassesWithCx) => React.ReactNode
  close: () => void
}

const cx = classNames.bind(classes) as TCx;
const classesWithCx: TClassesWithCx = { ...(classes as TClasses), cx };

GeneralPopup.Img = Img;
GeneralPopup.Btn = Btn;
GeneralPopup.EmailForm = EmailForm;
GeneralPopup.Oferta = Oferta;

export default function GeneralPopup(props: IProps) {
  return (
    <Popup
      close={props.close}
      children={startClosingProcess => (
        <div className={classes.contentWrapper}>
          <div className={classes.close} onClick={startClosingProcess}>
            <Icon icon='Cross'/>
          </div>
          {props.children(classesWithCx)}
        </div>
      )}
    />
  );
}
