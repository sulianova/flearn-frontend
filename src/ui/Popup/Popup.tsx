import classnames from 'classnames/bind';
import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

import ModalCross from 'assets/images/Svg/ModalCross';

import classes from './Popup.module.scss';

const cx = classnames.bind(classes);

export default Popup;

interface IProps {
  children: ReactNode
  onClose?: () => void
}

function Popup({ children, onClose }: Readonly<IProps>) {
  return createPortal(
    (
      <div className={cx({ modal: true, modal_Animation: true })}>
        {onClose && (
          <div className={classes.modalClose} onClick={onClose}>
            <ModalCross/>
          </div>
        )}
        <div className={classes.modalContentWrapper}>
          <div className={cx({ modalContent: true})}>
            {children}
          </div>
        </div>
      </div>
    ),
  document.body
  );
}
