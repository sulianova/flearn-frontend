import classes from './Input.module.scss';

export default Input;

function Input() {
  return (
    <div className={classes._}>
      <div className={classes.content}> 
        <label className="s-text-18">Ссылка</label>
        <input placeholder="https://" type="text"/>
      </div>
    </div>
  );
}