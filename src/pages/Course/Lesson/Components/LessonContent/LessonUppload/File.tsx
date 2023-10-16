import {Image3} from 'assets/images';
import classes from './File.module.scss';

export default File;

interface IProps {
  src?: string
}
function File(props: IProps) {
  return (
    <div> <img className={classes.preview} src={props.src ?? Image3}/>
      <div className={classes.name + ' s-text-18'}>3.jpg</div>
      <button className={classes.remove + ' s-text-14'}>Удалить</button>
    </div>
  );
}
