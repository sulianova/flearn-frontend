import classnames from 'classnames/bind';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import classes from './Popup.module.scss';

const cx = classnames.bind(classes);

export default Popup;

const MODAL_ANIMATION_DURATION = 200;
interface IProps {
  close: () => void
  children: (startClosingProcess: () => void) => ReactNode
}

function Popup({ children, close }: Readonly<IProps>) {
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

  const startClosingProcess = useCallback(() => {
    setState('CLOSING');
    setTimeout(close, MODAL_ANIMATION_DURATION);
  }, [close]);

  return createPortal(
    (
      <div className={cx({ modal: true, modalOverlay_AnimationEnter: state === 'OPENING' || state === 'OPENED', modalOverlay_AnimationExit: state === 'CLOSING' })}>
        {(state === null || state === 'OPENING' || state === 'OPENED' || state === 'CLOSING') && (
          <div className={classes.modalContentWrapper}>
            <div className={cx({ modalContent: true})}>
              {children(startClosingProcess)}
            </div>
          </div>
        )}
      </div>
    ),
  document.body
  );
}
