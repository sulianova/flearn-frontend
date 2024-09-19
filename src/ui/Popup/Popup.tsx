import classnames from 'classnames/bind';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import classes from './Popup.module.scss';
import { BehaviorSubject } from 'rxjs';

const cx = classnames.bind(classes);

export default Popup;

const MODAL_ANIMATION_DURATION = 200;
const openedPopupsCountBS = new BehaviorSubject(0);

interface IProps {
  close: () => void
  children: (startClosingProcess: () => void) => ReactNode
}

openedPopupsCountBS.subscribe(count => {
  if (count > 0) {
    document.body.style.overflowY = 'hidden';
  } else {
    document.body.style.overflowY = '';
  }
});

function Popup({ children, close }: Readonly<IProps>) {
  const [state, setState] = useState<null | 'OPENING' | 'OPENED' | 'CLOSING'>(null);

  useEffect(() => {
    openedPopupsCountBS.next(openedPopupsCountBS.getValue() + 1);
    return () => openedPopupsCountBS.next(openedPopupsCountBS.getValue() - 1);
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
      <div className={cx({ modal: true, modal__AnimationEnter: state === 'OPENING' || state === 'OPENED', modal__AnimationExit: state === 'CLOSING' })}>
        <div className={classes.overlay}></div>
        {(state === null || state === 'OPENING' || state === 'OPENED' || state === 'CLOSING') && (
          <div className={classes.modal__ContentWrapper}>
            <div className={cx({ modal__Content: true})}>
              {children(startClosingProcess)}
            </div>
          </div>
        )}
      </div>
    ),
  document.body
  );
}
