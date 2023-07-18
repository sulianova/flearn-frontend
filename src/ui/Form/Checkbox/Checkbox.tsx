import { v4 } from 'uuid';

interface IProps {
  className: string
  id?: string
  children: React.ReactNode | React.ReactNode[]
}

export default function Checkbox(props: IProps) {
  const id = props.id || v4();
  return (
    <>
      <input className={props.className} type='checkbox' id={id} defaultChecked/>
      <label htmlFor={id}>
        {props.children}
      </label>
    </>
  );
}
