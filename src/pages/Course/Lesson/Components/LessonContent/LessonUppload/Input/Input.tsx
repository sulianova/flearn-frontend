import { useGetId } from 'hooks';
import { formatI18nT } from 'shared';

import classes from './Input.module.scss';

import { formatI18nT } from 'shared';

const t = formatI18nT('courseLesson.upload');

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
        <label className='s-text-18'>{t('contentInputLabel')}</label>
        <input placeholder='https://' type='text'/>
      </div>
    </div>
  );
}
