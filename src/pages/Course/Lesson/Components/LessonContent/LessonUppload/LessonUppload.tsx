import classNames from 'classnames/bind';
import { useState } from 'react';
import { useParams } from 'react-router';

import { firebaseService } from 'services';
import { formatI18nT } from 'shared';

import File from './File';
import Input from './Input';
import Textarea from './Textarea';

import classes from './LessonUppload.module.scss';

export default LessonUppload;

const t = formatI18nT('courseLesson.upload');
const cx = classNames.bind(classes);

function LessonUppload() {
  const { courseId, lessongId } = useParams();
  const [url, setUrl] = useState<string>('');

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
              <input onChange={handleAddFiles} type='file' multiple hidden id='added-files'/>
              <label className={classes.filesBtn} htmlFor='added-files'>{t('filesBtn')}</label>
            </div>
            <div className={classes.filesContent}>
              {url && <div className={classes.file}> <File src={url}/></div>}
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

  async function handleAddFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    console.log({ files });
    if (files) {
      const file = files[0];
      const imageId = file.name;
      await firebaseService.uploadImage({ courseId: courseId!, folder: lessongId!, imageId, variant: 'homeworks', file });
      const imageSrc = await firebaseService.getImageURL({ courseId: courseId!, folder: lessongId!, imageId, variant: 'homeworks' });
      if (imageSrc) {
        setUrl(imageSrc);
      }
    }
  }
}
