import type { ButtonHTMLAttributes } from 'react';

import classes from './Btn.module.scss';

type TClassesNames =
  | 'btn'
  | 'btn_primary'
  | 'btn_secondary';

interface IProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {}

export default function Btn(props: IProps) {
  const { children, ...buttonProps } = props;
  return (
    <button
      className={classes.btn}
      {...buttonProps}
    >
      <div className={classes.content}>
        {children}
      </div>
    </button>
  );
}
