import classNames from 'classnames/bind';
import type { DetailedHTMLProps, InputHTMLAttributes } from 'react';

import { useGetId } from 'hooks';
import { i18n } from 'shared';

import classes from './InputField.module.scss';

const cx = classNames.bind(classes);

export interface IProps
  extends Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'onChange' | 'id' | 'type' | 'name' | 'placeholder' | 'size'>
{
  variant: 'Name' | 'Email' | 'Phone'
  size: 'lg' | 'md'
  value?: string
  onChange?: (v: string) => void
  state?: 'idle' | 'error'
  label?: string
  caption?: string
}

const type = {
  'Name': 'text',
  'Email': 'email',
  'Phone': 'tel',
} as const;

export default function InputField(props: IProps) {
  const {
    variant,
    size,
    value,
    onChange,
    state = 'idle',
    label,
    caption,
    ...inputProps
  } = props;

  const getId = useGetId();

  return (
    <div className={classes.wrapper} {...{ [`data-input-state-${state}`]: true }}>
      {label && (
        <label htmlFor={getId()} className={cx({ label: true, label_disabled: inputProps.disabled })}>
          {label}
        </label>
      )}
      <input
        {...inputProps}
        id={getId()}
        name={variant.toLocaleLowerCase()}
        type={type[variant]}
        placeholder={i18n.t(`input${variant}.placeholder`)}
        className={cx({
          input: true,
          input_empty: !value,
          [`input_${size}`]: true,
          [`input_${state}`]: true,
        }, props.className)}
        value={value}
        onChange={e => props.onChange?.(e.target.value)}
      />
      {caption && (
        <div className={cx({ caption: true, [`caption_${state}`]: true, caption_disabled: inputProps.disabled })}>
          {caption}
        </div>
      )}
    </div>
  );
}
