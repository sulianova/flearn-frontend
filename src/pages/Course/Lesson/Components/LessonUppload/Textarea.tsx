import classes from './Textarea.module.scss';

export default Textarea;

function Textarea() {
  return (
    <div className={classes._}>
      <div className={classes.content}>
        <label className="s-text-18">Описание</label>
        <div className={classes.contentInner + " s-text-18"}>
          <textarea rows={1} placeholder="Комментарий к работе"></textarea>
        </div>
      </div>
    </div>
  );
}