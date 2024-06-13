import { useGetId } from 'hooks';
import { formatI18nT } from 'shared';

import UITextarea from 'ui/Form/Textarea/Textarea';

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
        <label className='s-text-18'>{t('contentTextareaLabel')}</label>
        <div className={classes.contentInner}>
          <UITextarea
              value={props.value}
              onChange={e => props.onChange(e.target.value)}
              id={getId('description')}
              rows={1}
              placeholder={t('contentTextareaPlaceholder')}
              resizable='vertical-auto'
          />
        </div>
      </div>
    </div>
  );
}
