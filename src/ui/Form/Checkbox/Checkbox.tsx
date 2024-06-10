import { v4 } from 'uuid';
import Check from 'assets/images/Svg/Check';

interface IProps {
  className?: string
  id?: string
  children: React.ReactNode | React.ReactNode[]
  value?: boolean
  onChange?: (v: boolean) => void
}

export default function Checkbox(props: IProps) {
  const id = props.id || v4();
  return (
    <>
      <input
        id={id}
        className={props.className}
        type='checkbox'
        checked={props.value}
        onChange={e => props.onChange?.(e.target.checked)}
      />
      <label htmlFor={id}>
        <Check/>
        <span>{props.children}</span>
      </label>
    </>
  );
}
