import { v4 } from 'uuid';

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
        {props.children}
      </label>
    </>
  );
}
