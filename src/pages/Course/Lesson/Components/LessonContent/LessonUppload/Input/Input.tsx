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
      <div className={classes.content}>
        <label className='s-text-18' htmlFor={getId('externalHomeworkLink')}>{t('externalHomeworkLinkInputLabel')}</label>
        <input
          value={props.value}
          onChange={e => props.onChange(e.target.value)}
          id={getId('externalHomeworkLink')}
          placeholder='https://'
          type='text'
        />
      </div>
    </div>
  );
}
