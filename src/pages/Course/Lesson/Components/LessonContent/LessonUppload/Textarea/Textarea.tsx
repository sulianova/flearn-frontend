import { useGetId } from 'hooks';
import { formatI18nT } from 'shared';

import classes from './Textarea.module.scss';

export default Textarea;

const t = formatI18nT('courseLesson.upload');

interface IProps {
  value: string
  onChange: (value: string) => void
}

function Textarea(props: Readonly<IProps>) {
  const getId = useGetId();
  return (
    <div className={classes._}>
      <div className={classes.content}>
        <label className='s-text-18' htmlFor={getId('description')}>{t('descriptionInputLabel')}</label>
        <div className={classes.contentInner + ' s-text-18'}>
          <textarea
            value={props.value}
            onChange={e => props.onChange(e.target.value)}
            id={getId('description')}
            rows={1}
            placeholder={t('descriptionInputPlaceholder')}
          />
        </div>
      </div>
    </div>
  );
}
