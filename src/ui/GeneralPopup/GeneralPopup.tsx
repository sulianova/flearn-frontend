import type { CSSProperties } from 'react';

import { getClassesWithCx, type TClassesWithCx } from 'utils';

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

interface IProps {
  children: ((classes: TClassesWithCx<TClassesNames>) => React.ReactNode) | React.ReactNode
  close: () => void
  style?: CSSProperties
}

const classesWithCx = getClassesWithCx<TClassesNames>(classes);

GeneralPopup.Img = Img;
GeneralPopup.Btn = Btn;
GeneralPopup.EmailForm = EmailForm;
GeneralPopup.Oferta = Oferta;

export default function GeneralPopup(props: IProps) {
  return (
    <Popup
      close={props.close}
      children={startClosingProcess => (
        <div className={classes.contentWrapper} style={props.style}>
          <div className={classes.close} onClick={startClosingProcess}>
            <Icon icon='Cross'/>
          </div>
          {typeof props.children === 'function' ?  props.children(classesWithCx) : props.children}
        </div>
      )}
    />
  );
}
