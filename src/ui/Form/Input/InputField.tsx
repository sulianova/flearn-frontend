import { i18n } from 'shared';
import { v4 } from 'uuid';

import { Fragment } from 'react';
import classes from './InputField.module.scss';

export default InputField;

export interface IProps {
  className?: string
  variant: 'Name' | 'Email' | 'Phone'
  value?: string
  onChange?: (v: string) => void
}

const type = {
  'Name': 'text',
  'Email': 'email',
  'Phone': 'tel',
} as const;

function InputField(props: IProps) {
  const id = v4();
  return (
    <div className={classes.inputWrap}>
      {/* <div className={classes.inputTitle}>inputTitle</div> */}
      <label htmlFor={id}/>
      <input
        id={id}
        name={props.variant.toLocaleLowerCase()}
        type={type[props.variant]}
        placeholder={i18n.t(`input${props.variant}.placeholder`)}
        className={props.className}
        required
        value={props.value}
        onChange={e => props.onChange?.(e.target.value)}
      />
      {/* <div className={classes.inputCaption}>inputCaption</div> */}
    </div>
  );
}
