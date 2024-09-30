import type { ButtonHTMLAttributes } from 'react';

import { getClassesWithCx  } from 'utils';

import classes from './Btn.module.scss';

type TClassesNames =
  | 'btn'
  | 'btn_special'
  | 'btn_primary'
  | 'btn_invisible'
  | 'btn_loading'

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

Btn.classesWithCx = getClassesWithCx<TClassesNames>(classes);

export default function Btn(props: IProps) {
  const { children, className, ...buttonProps } = props;
  return (
    <button
      className={Btn.classesWithCx.cx({ btn: true }, className)}
      {...buttonProps}
    >
      <div className={classes.content}>
        {children}
      </div>
    </button>
  );
}
