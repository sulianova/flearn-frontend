import classes from './Input.module.scss';

import { formatI18nT } from 'shared';

const t = formatI18nT('courseLesson.upload');

export default Input;

function Input() {
  return (
    <div className={classes._}>
      <div className={classes.content}>
        <label className='s-text-18'>{t('contentInputLabel')}</label>
        <input placeholder='https://' type='text'/>
      </div>
    </div>
  );
}
