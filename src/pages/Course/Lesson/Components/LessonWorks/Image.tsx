import classes from './Image.module.scss'
import { Image3 } from 'assets/images';

export default Image;

function Image() {
  return (
  <picture>
    <img className={classes._} src={Image3}/>
  </picture>
  );
}