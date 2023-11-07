import { useGetId } from 'hooks';
import { formatI18nT } from 'shared';

import classes from './Input.module.scss';

export default Input;

const t = formatI18nT('courseLesson.upload');

interface IProps {
  value: string
  onChange: (value: string) => void
}

function Input(props: Readonly<IProps>) {
  const getId = useGetId();
  return (
    <div className={classes._}>
      <div className={classes.content + ' s-text-18'}>
        <label
          htmlFor={getId('contentInput')}
        >
          {t('contentInputLabel')}
        </label>
        <input
          id={getId('contentInput')}
          placeholder='https://'
          type='text'
          value={props.value}
          onChange={e => props.onChange(e.target.value)}
        />
      </div>
    </div>
  );
}
