import classnames from 'classnames/bind';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import classes from './Popup.module.scss';

const cx = classnames.bind(classes);

export default Popup;

const MODAL_ANIMATION_DURATION = 200;
interface IProps {
  children: ReactNode | ((close: (onClose: () => void) => void) => ReactNode)
}

function Popup({ children }: Readonly<IProps>) {
  const [state, setState] = useState<null | 'OPENING' | 'OPENED' | 'CLOSING'>(null);

  useEffect(() => {
    document.body.style.overflowY = 'hidden';

    return () => {
      document.body.style.overflowY = '';
    };
  }, []);

  useEffect(() => {
    setState('OPENING');
    setTimeout(() => setState('OPENED'), MODAL_ANIMATION_DURATION);
  }, []);

  const close = useCallback((onClose: () => void) => {
    setState('CLOSING');
    setTimeout(onClose, MODAL_ANIMATION_DURATION);
  }, []);

  const openCloseAnimation = state != null && state != 'CLOSING';

  return createPortal(
    (
      <div className={cx({ modal: true, modal_Animation: state === 'OPENING' || state === 'OPENED' })}>
        {(state === null || state === 'OPENING' || state === 'OPENED') && (
          <div className={classes.modalContentWrapper}>
            <div className={cx({ modalContent: true, modalContent_Animation: openCloseAnimation })}>
              {typeof children === 'function' ? children(close) : children}
            </div>
          </div>
        )}
      </div>
    ),
  document.body
  );
}
