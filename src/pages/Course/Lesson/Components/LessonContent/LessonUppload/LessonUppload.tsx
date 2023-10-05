import File from './File';
import Input from './Input';
import classes from './LessonUppload.module.scss';
import Textarea from './Textarea';
import classNames from 'classnames/bind';

import { formatI18nT, i18n } from 'shared';

export default LessonUppload;

const t = formatI18nT('courseLesson.upload');
const cx = classNames.bind(classes);

function LessonUppload() {
  return (
      <form className={classes._} action='' id='upload-form'>
        <div className={classes.inner}>
          <div className={classes.fields}>
            <div className={classes.fieldsTitle + ' s-text-36'}>{t('fieldsTitle')}</div>
            <div className={classes.fieldsInner}>
              <Textarea/>
              <Input/>
            </div>
            <div className={classes.save}>
                <button className={cx({submitBtn: true, isDisabled: true})+ ' s-text-18'} type='submit' disabled>{t('submitBtn')}</button>
                <div className={classes.submitDescription + ' s-text-14'}>{t('submitDescription')} </div>
              </div>
          </div>
          <div className={classes.files}>
            <div className={classes.filesHeader}>
              <div className={classes.filesTitle + ' s-text-36'}>{t('filesTitle')}</div>
              <input type='file' multiple hidden id='added-files'/>
              <label className={classes.filesBtn} htmlFor='added-files'>{t('filesBtn')}</label>
            </div>
            <div className={classes.filesContent}>
              <div className={classes.file}> <File/></div>
              <div className={classes.file}> <File/></div>
              <div className={classes.file}> <File/></div>
              <div className={classes.file}> <File/></div>
              <div className={classes.file}> <File/></div>
              <div className={classes.file}> <File/></div>
            </div>
          </div>
        </div>
      </form>
  );
}
