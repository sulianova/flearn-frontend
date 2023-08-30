import { i18n } from 'shared';
import { v4 } from 'uuid';

import { Fragment } from 'react';

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
    <Fragment>
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
    </Fragment>
  );
}
