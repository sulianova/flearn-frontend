import type { ButtonHTMLAttributes } from 'react';

import { getClassesWithCx  } from 'utils';

import classes from './Btn.module.scss';

type TClassesNames =
  | 'btn'
  | 'btn_primary'
  | 'btn_secondary';

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const classesWithCx = getClassesWithCx<TClassesNames>(classes);
console.log({ classesWithCx });
Btn.classesWithCx = classesWithCx;

export default function Btn(props: IProps) {
  const { children, className, ...buttonProps } = props;
  return (
    <button
      className={classesWithCx.cx({ btn: true }, className)}
      {...buttonProps}
    >
      <div className={classes.content}>
        {children}
      </div>
    </button>
  );
}
