import classes from './File.module.scss';
import {Image3} from 'assets/images';

export default File;

function File() {
  return (
    <div> <img className={classes.preview} src={Image3}/>
      <div className={classes.name + " s-text-18"}>3.jpg</div>
      <button className={classes.remove + " s-text-14"}>Удалить</button>
    </div>
  );
}