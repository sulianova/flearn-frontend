import classes from './Textarea.module.scss';

import { formatI18nT } from 'shared';

const t = formatI18nT('courseLesson.upload');

export default Textarea;

function Textarea() {
  return (
    <div className={classes._}>
      <div className={classes.content}>
        <label className='s-text-18'>{t('contentTextareaLabel')}</label>
        <div className={classes.contentInner + ' s-text-18'}>
          <textarea rows={1} placeholder='Комментарий к работе'/>
        </div>
      </div>
    </div>
  );
}
