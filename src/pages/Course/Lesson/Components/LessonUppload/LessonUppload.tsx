import File from './File';
import Input from './Input';
import classes from './LessonUppload.module.scss';
import Textarea from './Textarea';

export default LessonUppload;

function LessonUppload() {
  return (
      <form className={classes._} action='' id='upload-form'>
        <div className={classes.inner}>
          <div className={classes.fields}>
            <div className={classes.fieldsTitle + ' s-text-36'}>Загрузка работы</div>
            <div className={classes.fieldsInner}>
              <Textarea/>
              <Input/>
            </div>
          </div>
          <div className={classes.files}>
            <div className={classes.filesHeader}>
              <div className={classes.filesTitle + ' s-text-36'}>Файлы</div>
              <input type='file' multiple hidden id='added-files'/>
              <label className={classes.filesBtn + ' s-hoverable'} htmlFor='added-files'>Добавить</label>
            </div>
            <div className={classes.filesContent}>
              <div className={classes.file}> <File/></div>
              <div className={classes.file}> <File/></div>
              <div className={classes.file}> <File/></div>
            </div>
          </div>
        </div>
        <div className={classes.submit}>
          <button className={classes.submitBtn + ' s-text-18'} type='submit' disabled>Отправить на проверку</button>
          <div className={classes.submitDescription + ' s-text-14'}>После отправки задания вы сможете смотреть работы других студентов</div>
        </div>
      </form>
  );
}
