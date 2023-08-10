import { Image3 } from 'assets/images';
import classes from './Image.module.scss';

export default Image;

function Image() {
  return (
  <picture>
    <img className={classes._} src={Image3}/>
  </picture>
  );
}
